import React, { useState, useEffect } from 'react';

const AlertIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'error':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'warning':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    case 'info':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  show, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [progress, setProgress] = useState(100);

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const iconStyles = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  };

  const progressStyles = {
    success: 'bg-green-200',
    error: 'bg-red-200',
    warning: 'bg-yellow-200',
    info: 'bg-blue-200'
  };

  useEffect(() => {
    setIsVisible(show);
    if (show && autoClose) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prev - (100 / (duration / 100));
        });
      }, 100);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [show, autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 top-4 right-4 left-4 md:left-auto md:w-96 animate-slide-in">
      <div 
        className={`relative overflow-hidden rounded-lg border p-4 ${typeStyles[type]} shadow-lg`}
        role="alert"
      >
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${iconStyles[type]}`}>
            <AlertIcon type={type} />
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-sm font-medium mb-1">
                {title}
              </h3>
            )}
            {message && (
              <p className="text-sm opacity-90">
                {message}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className={`flex-shrink-0 ml-4 rounded-lg p-1.5 inline-flex hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'success' ? 'hover:bg-green-800 focus:ring-green-500' :
              type === 'error' ? 'hover:bg-red-800 focus:ring-red-500' :
              type === 'warning' ? 'hover:bg-yellow-800 focus:ring-yellow-500' :
              'hover:bg-blue-800 focus:ring-blue-500'
            }`}
          >
            <span className="sr-only">Close</span>
            <svg 
              className="h-4 w-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        {autoClose && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10">
            <div
              className={`h-full transition-all duration-100 ${progressStyles[type]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Add this to your global CSS or Tailwind config
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;

// Usage Example Component
const AlertExample = () => {
  const [alert, setAlert] = useState({
    show: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showAlert = (type, title, message) => {
    setAlert({
      show: true,
      type,
      title,
      message
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => showAlert('success', 'Success!', 'Operation completed successfully.')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Show Success Alert
      </button>
      
      <button
        onClick={() => showAlert('error', 'Error!', 'Something went wrong.')}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Show Error Alert
      </button>
      
      <button
        onClick={() => showAlert('warning', 'Warning!', 'Please proceed with caution.')}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Show Warning Alert
      </button>
      
      <button
        onClick={() => showAlert('info', 'Info', 'Here is some useful information.')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Info Alert
      </button>

      <Alert
        show={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={hideAlert}
        autoClose={true}
        duration={5000}
      />
    </div>
  );
};

export default AlertExample;