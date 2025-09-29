import { useState } from "react";
import { Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { showToast } from "../../utils/toast";
import { z } from "zod";
import { authService } from "../../services";

// Schema للتحقق من الإيميل
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({ email: "" });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      forgotPasswordSchema.parse(formData); // تحقق محلي
      setValidationError(null);

      setIsLoading(true);
      // هنا بتعملي الريكوست للـ API الخاص بالـ forgot password
      await authService.forgotPassword(formData.email);

      showToast.success("Password reset instructions sent to your email!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0]?.message || "Invalid input";
        setValidationError(firstError);
        showToast.error(firstError);
      } else {
        showToast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-md mx-auto">
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email address and we’ll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Email <span className="text-error-500">*</span></Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            error={!!validationError}
            hint={validationError || ""}
          />
        </div>

        <Button
          className="w-full"
          size="md"
          variant="primary"
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-5 text-center">
        <Link
          to="/signin"
          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
