import { toast } from 'react-toastify';

class ToastService {
  showErrorToast(message: string) {
    toast.error(message);
  }
}

export const toastService = new ToastService();
