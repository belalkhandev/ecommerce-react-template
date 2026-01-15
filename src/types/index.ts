/**
 * Centralized type exports
 */

// Product types
export type {
  Product,
  ProductBadge,
  Category,
  ProductFilterCategory,
  ProductFilters,
  ProductSortOption,
} from './product';

// Cart and commerce types
export type {
  CartItem,
  WishlistItem,
  CompareItem,
  OrderSummary,
  CouponCode,
} from './cart';

// Form types
export type {
  ShippingData,
  PaymentData,
  CheckoutStep,
  ShippingMethod,
  LoginFormData,
  RegisterFormData,
  AddressFormData,
  ChangePasswordFormData,
  ProfileFormData,
} from './forms';

// Common UI types
export type {
  BaseComponentProps,
  IconProps,
  ButtonVariant,
  ButtonSize,
  ButtonProps,
  SkeletonProps,
  ModalProps,
  ToastType,
  ToastProps,
  PaginationProps,
  SearchResult,
  BreadcrumbItem,
  TabItem,
  StepItem,
  QuantitySelectorProps,
} from './common';

// Wake Lock types
export type {
  WakeLockSentinel,
  WakeLock,
  NavigatorWithWakeLock,
  WakeLockState,
  UseWakeLockReturn,
} from './wakelock';

// Animation types and variants
export type { Variants, Transition } from './animation';
export {
  fadeInVariants,
  fadeInUpVariants,
  fadeInDownVariants,
  slideInLeftVariants,
  slideInRightVariants,
  scaleInVariants,
  containerVariants,
  itemVariants,
  listContainerVariants,
  listItemVariants,
  defaultTransition,
  springTransition,
  smoothTransition,
} from './animation';

// Quotation types
export type {
  QuotationStatus,
  QuotationItem,
  QuotationMessage,
  Quotation,
  QuotationFormData,
  NewQuotationItem,
} from './quotation';
export { QUOTATION_STATUS_CONFIG, UNIT_OPTIONS } from './quotation';
