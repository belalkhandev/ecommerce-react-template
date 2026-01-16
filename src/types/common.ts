/**
 * Common UI and utility type definitions
 */

import type { ReactNode, SVGProps, HTMLAttributes } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Icon component props
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

// Skeleton props
export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
}

// Modal props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  className?: string;
}

// Toast/Notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

// Search result type
export interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Tab types
export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
}

// Step indicator types
export interface StepItem {
  id: string;
  label: string;
  number: number;
}

// Quantity selector props
export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}
