import { createContext, useContext, useRef, useState } from "react";
import Toast from "../components/Notifications/toast";
import Modal from "../components/Notifications/Modal";
import Loading from "../components/Notifications/Loading";
import "../assets/toast.css";

const ToastContext = createContext();

export const durations = {
    success: 2500,
    info: 3000,
    warning: 4000,
    error: 5000
};

export function ToastProvider({ children }) {

    const [toast, setToast] = useState({
        visible: false,
        message: "",
        type: "info"
    });

    const [modal, setModal] = useState({
        visible: false,
        message: "",
        buttons: "ok",
        type: "info",
        resolve: null
    });

    const [loading, setLoading] = useState({
        visible: false,
        message: "Loading..."
    });
    const loadingCount = useRef(0);

    function showToast(message, type = "info") {

        setToast({
            visible: true,
            message,
            type
        });

        setTimeout(() => {
            setToast((prev) => ({
                ...prev,
                visible: false
            }));
        }, durations[type] || 3000);
    }

    function showModal(
        message,
        buttons = "ok",
        type = "info"
    ) {

        return new Promise((resolve) => {

            setModal({
                visible: true,
                message,
                buttons,
                type,
                resolve
            });

        });
    }

    function closeModal(result) {

        if (modal.resolve) {
            modal.resolve(result);
        }

        setModal({
            visible: false,
            message: "",
            buttons: "ok",
            type: "info",
            resolve: null
        });
    }

    function showLoading(message = "Loading...") {
        loadingCount.current += 1;
        setLoading({
            visible: true,
            message
        });
    }

    function hideLoading() {
        loadingCount.current = Math.max(0, loadingCount.current - 1);

        if (loadingCount.current === 0) {
            setLoading({
                visible: false,
                message: "Loading..."
            });
        }
    }

    return (
        <ToastContext.Provider
            value={{
                showToast,
                durations,
                showModal,
                closeModal,
                showLoading,
                hideLoading
            }}>

            {children}

            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
            />

            <Modal
                visible={modal.visible}
                message={modal.message}
                buttons={modal.buttons}
                type={modal.type}
                onClose={closeModal}
            />

            <Loading
                visible={loading.visible}
                message={loading.message}
            />

        </ToastContext.Provider>
    );
}

export function useToast() {

    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used within a ToastProvider"
        );
    }

    return context;
}