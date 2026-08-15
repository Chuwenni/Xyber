import { useState } from "react";
import { useToast } from "../../Context/ToastContext";

export default function AccountSettings() {
    const { showModal, showToast } = useToast();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        orderNotifications: true,
        promotionalNotifications: false,
        publicProfile: true
    });

    const updateSetting = (name) => {
        setSettings((current) => ({
            ...current,
            [name]: !current[name]
        }));
    };

    const handleSave = () => {
        showToast("Settings saved successfully.", "success");
    };

    const handleDelete = async () => {
        const confirmed = await showModal(
            "Are you sure you want to permanently delete your account? This action cannot be undone.",
            "yesno",
            "error"
        );

        if (confirmed) {
            showToast("Account deletion would be processed here.", "info");
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <div className="page-header">
                    <h1>Account Settings</h1>
                    <p>Manage your account, security, and website preferences.</p>
                </div>

                <div className="settings-layout">
                    <section className="settings-section">
                        <div className="settings-section-header">
                            <h2>Security</h2>
                            <p>Manage how your account is protected.</p>
                        </div>

                        <div className="settings-row">
                            <div>
                                <h3>Password</h3>
                                <p>Change your account password.</p>
                            </div>

                            <button className="secondary-button">
                                Change Password
                            </button>
                        </div>

                        <div className="settings-row">
                            <div>
                                <h3>Two-Factor Authentication</h3>
                                <p>Add another layer of protection to your account.</p>
                            </div>

                            <button className="secondary-button">
                                Configure
                            </button>
                        </div>
                    </section>

                    <section className="settings-section">
                        <div className="settings-section-header">
                            <h2>Notifications</h2>
                            <p>Choose which notifications you want to receive.</p>
                        </div>

                        <SettingToggle
                            title="Email Notifications"
                            description="Receive important account notifications by email."
                            enabled={settings.emailNotifications}
                            onClick={() => updateSetting("emailNotifications")}
                        />

                        <SettingToggle
                            title="Order Notifications"
                            description="Receive updates about your orders."
                            enabled={settings.orderNotifications}
                            onClick={() => updateSetting("orderNotifications")}
                        />

                        <SettingToggle
                            title="Promotional Notifications"
                            description="Receive product offers and promotions."
                            enabled={settings.promotionalNotifications}
                            onClick={() =>
                                updateSetting("promotionalNotifications")
                            }
                        />
                    </section>

                    <section className="settings-section">
                        <div className="settings-section-header">
                            <h2>Website Preferences</h2>
                            <p>Control how your ShopEase account appears and behaves.</p>
                        </div>

                        <SettingToggle
                            title="Public Profile"
                            description="Allow other users to view your public profile."
                            enabled={settings.publicProfile}
                            onClick={() => updateSetting("publicProfile")}
                        />

                        <div className="settings-row">
                            <div>
                                <h3>Language</h3>
                                <p>Select the language used by the website.</p>
                            </div>

                            <select className="settings-select" defaultValue="English">
                                <option>English</option>
                                <option>Filipino</option>
                            </select>
                        </div>
                    </section>

                    <section className="settings-section danger-section">
                        <div className="settings-section-header">
                            <h2>Delete Account</h2>
                            <p>
                                Permanently remove your account and associated
                                information.
                            </p>
                        </div>

                        <button
                            className="danger-button"
                            onClick={handleDelete}
                        >
                            Delete My Account
                        </button>
                    </section>

                    <div className="settings-save">
                        <button
                            className="dashboard-link settings-save-button"
                            onClick={handleSave}
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingToggle({ title, description, enabled, onClick }) {
    return (
        <div className="settings-row">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <button
                className={`toggle ${enabled ? "toggle-active" : ""}`}
                onClick={onClick}
                aria-label={`Toggle ${title}`}
            >
                <span />
            </button>
        </div>
    );
}
