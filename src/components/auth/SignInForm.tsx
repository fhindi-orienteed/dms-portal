import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import TrackPackage from "../tracking/TrackPackage";
import TrackingResults from "../tracking/TrackingResults";
import { useTracking } from "../../hooks/useTracking";
import { authService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../utils/toast";
import { loginSchema, LoginFormData } from "../../validation/loginSchema";
import { z } from "zod";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  
  const [credentials, setCredentials] = useState<LoginFormData>({
    userName: '',
    password: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { trackingResult, isTracking, trackPackage, resetTracking } = useTracking();

  const handleTrack = (trackingNumber: string) => {
    trackPackage(trackingNumber);
    setShowSignIn(false);
  };

  const handleTrackAnother = () => {
    resetTracking();
    setShowSignIn(true);
  };

  const handleSignIn = () => {
    setShowSignIn(true);
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(credentials);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof LoginFormData;
          errors[path] = err.message;
        });
        setValidationErrors(errors);
        
        // Show first error in toast
        const firstError = error.errors[0];
        if (firstError) {
          showToast.error(firstError.message);
        }
      }
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setLoginError(null);
    
    // Validate form but don't prevent submission
    const isValid = validateForm();
    
    // If form is invalid, we still allow submission but show validation errors
    if (!isValid) {
      // We'll let the server handle the final validation
      console.log('Form has validation errors, but allowing submission');
    }

    try {
      setIsLoading(true);
      
      const response = await authService.login(credentials);
      
      login(response.user, response.accessToken);
      
      showToast.success('Success! Login completed successfully!');
      
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.status === 403) {
        errorMessage = 'Access denied. Please contact administrator.';
      } else if (error.isNetworkError) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setLoginError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: 'userName' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
    
    // Clear general login error
    if (loginError) {
      setLoginError(null);
    }
  };

  // Real-time validation on blur
  const handleInputBlur = (field: 'userName' | 'password') => () => {
    // Validate only the specific field
    const result = loginSchema.safeParse(credentials);
    
    if (!result.success) {
      const fieldError = result.error.errors.find(err => 
        err.path[0] === field
      );
      
      if (fieldError) {
        setValidationErrors(prev => ({
          ...prev,
          [field]: fieldError.message
        }));
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 md:justify-center">
      {/* Track Package Form - TOP */}
      <TrackPackage onTrack={handleTrack} isTracking={isTracking} />

      {isTracking || !trackingResult && (  
        <>
          <div className="relative py-3 sm:py-5 w-full max-w-md mx-auto mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                Or
              </span>
            </div>
          </div>
        </>
      )}

      {/* Tracking Results or Sign In Form */}
      {trackingResult ? (
        <TrackingResults 
          result={trackingResult}
          onTrackAnother={handleTrackAnother}
          onSignIn={handleSignIn}
        />
      ) : showSignIn ? (
        <div className="flex flex-col justify-center w-full max-w-md mx-auto">
          <div className="w-full">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your username and password to sign in!
              </p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input 
                    placeholder="Enter your username" 
                    value={credentials.userName}
                    onChange={handleInputChange('userName')}
                    onBlur={handleInputBlur('userName')}
                    disabled={isLoading}
                    error={!!validationErrors.userName}
                    hint={validationErrors.userName}
                  />
                </div>
                
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={handleInputChange('password')}
                      onBlur={handleInputBlur('password')}
                      disabled={isLoading}
                      error={!!validationErrors.password}
                      hint={validationErrors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>                            
                
                <div>
                  <Button 
                    className="w-full" 
                    size="md"
                    variant="primary"
                    type="submit"
                    disabled={isLoading} // Only disable when loading, not for validation errors
                    loading={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Want to become a merchant? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Register as Merchant
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}