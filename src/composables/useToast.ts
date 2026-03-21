import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info';

const toasts = ref<any[]>([]);
let nextId = 0;

export function useToast() {
  const addToast = (message: string, type: ToastType = 'info') => {
    const id = nextId++;
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return { toasts, addToast, removeToast };
}
