import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import type { ClassValue } from 'clsx';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function showToast(
  message: string,
  description?: string,
  type: 'default' | 'success' | 'info' | 'warning' | 'error' = 'default',
) {
  const opts = {
    duration: 4000,
    richColors: true,
    position: 'bottom-right' as const,
    className: 'select-none',
    description,
  };

  switch (type) {
    case 'success':
      toast.success(message, opts);
      break;
    case 'info':
      toast.info(message, opts);
      break;
    case 'warning':
      toast.warning(message, opts);
      break;
    case 'error':
      toast.error(message, opts);
      break;
    default:
      toast(message, opts);
      break;
  }
}
