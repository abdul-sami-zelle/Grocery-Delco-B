"use client";
import "./style.css";

export default function ComingSoonPopupMain({ isOpen, onClose, heading }) {
    if (!isOpen) return null;

    const handleGetDirections = () => {
        window.open(
            "https://maps.app.goo.gl/2rpVhJqzU7RUzy1E9",
            "_blank"
        );
    };

    return (
        <div className="cs-overlay">
            <div className="cs-card">
                {/* Close Button */}
                <button className="cs-close" onClick={onClose}>×</button>

                <div className="cs-header">
                    <div className="cs-brand-tag">FRESH • LOCAL • GROCERY</div>
                    <h1 className="cs-title">
                        Currently available for <br /> in-store purchase only.
                    </h1>
                    <p className="cs-subtitle">DELCO FARMERS MARKET</p>
                </div>

                <div className="cs-spacer"></div>

                <div className="cs-info">
                    <h2 className="cs-date">{heading}</h2>

                    <p className="cs-desc">
                        This product can be purchased through our store.
                        Please contact us or visit the store for assistance.
                    </p>

                    <button
                        className="cs-confirm-btn"
                        onClick={handleGetDirections}
                    >
                        Get Direction
                    </button>
                </div>
            </div>
        </div>
    );
}