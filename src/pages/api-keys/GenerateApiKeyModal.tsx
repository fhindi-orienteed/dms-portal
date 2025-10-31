import React, { useState } from 'react';
import { Modal } from '../../components/ui/modal';
import Button from '../../components/ui/button/Button';
import { CopyIcon, LockIcon } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { apiKeyService } from '../../services/apiKeyService';
import toast from 'react-hot-toast';

interface GenerateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeyGenerated: () => void;
}

export const GenerateApiKeyModal: React.FC<GenerateApiKeyModalProps> = ({
  isOpen,
  onClose,
  onApiKeyGenerated,
}) => {
  const { t } = useLanguage();
  const [applicationName, setApplicationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!applicationName.trim()) {
      toast.error(t('apiKeys.enterApplicationName'));
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiKeyService.createApiKey({
        name: applicationName.trim(),
      });
      
      setGeneratedKey(response.key);
      setIsGenerated(true);
      toast.success(t('apiKeys.keyGeneratedSuccessfully'));
      onApiKeyGenerated();
    } catch {
      toast.error(t('apiKeys.failedToGenerateKey'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyKey = async () => {
    if (generatedKey) {
      try {
        await navigator.clipboard.writeText(generatedKey);
        toast.success(t('apiKeys.keyCopiedToClipboard'));
      } catch {
        toast.error(t('apiKeys.failedToCopyKey'));
      }
    }
  };

  const handleClose = () => {
    setApplicationName('');
    setGeneratedKey(null);
    setIsGenerated(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg mx-4">
      <div className="p-8">
        {!isGenerated ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('apiKeys.generateApiKey')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To enable secure access to the web services, your app requires an API key with permissions for resources such as the S3 bucket.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Enter your application name
                </label>
                <input
                  type="text"
                  value={applicationName}
                  onChange={(e) => setApplicationName(e.target.value)}
                  placeholder="Saasbold"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg 
                           bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white
                           placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Naming your application makes it easier to recognize your API key in the future.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 py-3 text-gray-700 border-gray-200 hover:bg-gray-50"
                >
                  Close
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !applicationName.trim()}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? t('apiKeys.generating') : 'Generate API key'}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Success Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <LockIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('apiKeys.keyGenerated')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('apiKeys.keyGeneratedDescription')}
                </p>
              </div>
            </div>

            {/* Security Warning */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5">
                  ⚠️
                </div>
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium mb-1">{t('apiKeys.securityWarning')}</p>
                  <p>{t('apiKeys.securityWarningDescription')}</p>
                </div>
              </div>
            </div>

            {/* Generated Key */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('apiKeys.yourApiKey')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={generatedKey || ''}
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleCopyKey}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 
                           dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  title={t('apiKeys.copyToClipboard')}
                >
                  <CopyIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6">
              <Button
                onClick={handleCopyKey}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <CopyIcon className="w-4 h-4" />
                {t('apiKeys.copyKey')}
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1"
              >
                {t('common.close')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
