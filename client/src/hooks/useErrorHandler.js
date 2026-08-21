import { useToast } from '../Context/ToastContext';

export const useErrorHandler = () => {
    const { showToast, showModal } = useToast();

    const handle = (error, type) => {
        if (!error.response) {
            showToast("Something went wrong. Please try again.", "error");
            return;
        }
        
        const status = error.response?.status;
        if (status) {
            CheckStatus(status, error, type === "modal" ? showModal : showToast);
        }
    };

    const CheckStatus = (status, error, method) => {
        const message = error.response?.data?.message
        switch (status) {
            case 400:
            case 401:
                method === showModal
                    ? method(message, "ok", "warning")
                    : method(message, "warning");
                break;
            case 403:
                method === showModal
                    ? method(message, "ok", "error")
                    : method(message, "error");
                break;
            case 404:
                method === showModal
                    ? method(message, "ok", "error")
                    : method(message, "error");
                break;
            case 500:
                method === showModal
                    ? method(message, "ok", "error")
                    : method(message, "error");
                break;
            default:
                method === showModal
                    ? method(message || "Something went wrong.", "ok", "error")
                    : method(message || "Something went wrong.", "error");
                break;
        }
    };

    return { handle };
};

export default useErrorHandler;