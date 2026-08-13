export default function Modal({
    visible,
    message,
    buttons,
    type,
    onClose
}) {

    if (!visible) {
        return null;
    }

    return (
        <div className="modal-overlay">

            <div className={`confirmation-modal modal-${type}`}>

                <div className="modal-icon">
                    {type === "success" && "✓"}
                    {type === "info" && "i"}
                    {type === "warning" && "!"}
                    {type === "error" && "×"}
                </div>

                <p className="modal-message">
                    {message}
                </p>

                <div className="modal-actions">

                    {buttons === "ok" && (
                        <button
                            className="modal-ok"
                            onClick={() => onClose(true)}
                        >
                            OK
                        </button>
                    )}

                    {buttons === "okcancel" && (
                        <>
                            <button
                                className="modal-cancel"
                                onClick={() => onClose(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="modal-ok"
                                onClick={() => onClose(true)}
                            >
                                OK
                            </button>
                        </>
                    )}

                    {buttons === "yesno" && (
                        <>
                            <button
                                className="modal-cancel"
                                onClick={() => onClose(false)}
                            >
                                No
                            </button>

                            <button
                                className="modal-ok"
                                onClick={() => onClose(true)}
                            >
                                Yes
                            </button>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}