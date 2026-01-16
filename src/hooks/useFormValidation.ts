import { useState, useCallback } from 'react';
import type { ZodSchema, ZodError } from 'zod';

export interface FieldError {
  message: string;
}

export interface FormErrors {
  [key: string]: FieldError | undefined;
}

export interface UseFormValidationReturn<T> {
  errors: FormErrors;
  validate: (data: T) => boolean;
  validateField: (field: keyof T, value: unknown) => boolean;
  clearErrors: () => void;
  clearFieldError: (field: keyof T) => void;
  setFieldError: (field: keyof T, message: string) => void;
  getFieldError: (field: keyof T) => string | undefined;
  hasErrors: boolean;
}

export function useFormValidation<T>(schema: ZodSchema<T>): UseFormValidationReturn<T> {
  const [errors, setErrors] = useState<FormErrors>({});

  const parseZodErrors = (error: ZodError): FormErrors => {
    const formErrors: FormErrors = {};
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!formErrors[path]) {
        formErrors[path] = { message: err.message };
      }
    });
    return formErrors;
  };

  const validate = useCallback((data: T): boolean => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        setErrors(parseZodErrors(error as ZodError));
      }
      return false;
    }
  }, [schema]);

  const validateField = useCallback((field: keyof T, value: unknown): boolean => {
    try {
      const partialSchema = schema.pick({ [field]: true } as any);
      partialSchema.parse({ [field]: value });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as ZodError;
        const fieldError = zodError.errors.find((e) => e.path[0] === field);
        if (fieldError) {
          setErrors((prev) => ({
            ...prev,
            [field as string]: { message: fieldError.message },
          }));
        }
      }
      return false;
    }
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field as string]: { message },
    }));
  }, []);

  const getFieldError = useCallback((field: keyof T): string | undefined => {
    return errors[field as string]?.message;
  }, [errors]);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
    setFieldError,
    getFieldError,
    hasErrors,
  };
}
