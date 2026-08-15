import { useToast } from '../Context/ToastContext';

export const useErrorHandler = () => {
    const { showToast, showModal } = useToast();

    const handle = (error, type) => {
        if (!error.response) {
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
            case 401:
                method(message, method === showModal ? "ok" : "", "warning");
                break;
            case 403:
                method(message,method === showModal ? "ok" : "", "error");
                break;
            case 404:
                method(message,method === showModal ? "ok" : "", "error");
                break;
            case 500:
                method(message,method === showModal ? "ok" : "", "error");
                break;
        }
    };

    return { handle };
};

export default useErrorHandler;