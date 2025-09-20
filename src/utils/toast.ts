import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string, options?: any) => {
    return toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        borderBottom: '4px solid var(--color-success-500)',
        background: 'var(--color-white)',
        color: 'var(--color-gray-700)',
        borderRadius: '8px',
        border: '1px solid var(--color-gray-200)',
        boxShadow: 'var(--shadow-theme-md)',
        padding: '16px',
        maxWidth: '400px',
        zIndex: 99999999,
      },
      iconTheme: {
        primary: 'var(--color-success-500)',
        secondary: 'var(--color-white)',
      },
      ...options
    });
  },

  error: (message: string, options?: any) => {
    return toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        borderBottom: '4px solid var(--color-error-500)',
        background: 'var(--color-white)',
        color: 'var(--color-gray-700)',
        borderRadius: '8px',
        border: '1px solid var(--color-gray-200)',
        boxShadow: 'var(--shadow-theme-md)',
        padding: '16px',
        maxWidth: '400px',
        zIndex: 99999999,
      },
      iconTheme: {
        primary: 'var(--color-error-500)',
        secondary: 'var(--color-white)',
      },
      ...options
    });
  },
}

export default toast;