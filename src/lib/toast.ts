import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  },

  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  },

  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 4000,
    });
  },

  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 4000,
    });
  },

  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  dismiss: (id?: string | number) => {
    sonnerToast.dismiss(id);
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => {
    return sonnerToast.promise(promise, messages);
  },

  custom: (message: string, options?: {
    description?: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }) => {
    sonnerToast(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
    });
  },

  addToCart: (productName: string) => {
    sonnerToast.success('Added to cart', {
      description: `${productName} has been added to your cart`,
      duration: 3000,
      action: {
        label: 'View Cart',
        onClick: () => {
          window.location.href = '/cart';
        },
      },
    });
  },

  addToWishlist: (productName: string) => {
    sonnerToast.success('Added to wishlist', {
      description: `${productName} has been saved to your wishlist`,
      duration: 3000,
    });
  },

  removeFromWishlist: (productName: string) => {
    sonnerToast.info('Removed from wishlist', {
      description: `${productName} has been removed from your wishlist`,
      duration: 3000,
    });
  },

  addToCompare: (productName: string) => {
    sonnerToast.success('Added to compare', {
      description: `${productName} has been added to comparison`,
      duration: 3000,
      action: {
        label: 'Compare Now',
        onClick: () => {
          window.location.href = '/compare';
        },
      },
    });
  },

  maxCompareReached: () => {
    sonnerToast.warning('Compare limit reached', {
      description: 'You can compare up to 4 products at a time',
      duration: 4000,
    });
  },

  orderPlaced: (orderNumber: string) => {
    sonnerToast.success('Order placed successfully!', {
      description: `Your order #${orderNumber} has been confirmed`,
      duration: 6000,
      action: {
        label: 'View Order',
        onClick: () => {
          window.location.href = `/orders/${orderNumber}`;
        },
      },
    });
  },

  quotationSubmitted: () => {
    sonnerToast.success('Quotation submitted', {
      description: 'Our team will review and respond within 24-48 hours',
      duration: 5000,
    });
  },

  networkError: () => {
    sonnerToast.error('Connection error', {
      description: 'Please check your internet connection and try again',
      duration: 5000,
    });
  },

  sessionExpired: () => {
    sonnerToast.error('Session expired', {
      description: 'Please log in again to continue',
      duration: 5000,
      action: {
        label: 'Log In',
        onClick: () => {
          window.location.href = '/login';
        },
      },
    });
  },
};
