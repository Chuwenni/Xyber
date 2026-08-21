export default function Loading({ visible, message = "Loading..." }) {
    if (!visible) return null;

    return (
        <div
            className="loading-overlay"
            role="status"
            aria-live="polite"
            aria-label={message}
        >
            <div className="loading-spinner" aria-hidden="true" />
            <p className="loading-message">{message}</p>
        </div>
    );
}