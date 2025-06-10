import { toast, type ToastOptions } from "react-toastify";

const Toast = (message: React.ReactNode, options: ToastOptions) => {
  toast(message, { ...options });
};

export default Toast;
