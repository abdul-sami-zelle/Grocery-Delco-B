"use client";
import "./style.css";

export default function ComingSoonPopup2({ isOpen, onClose,heading }) {
    if (!isOpen) return null;

    return (
        <div className="cs-overlay">
            <div className="cs-card">
                {/* Close Button */}
                <button className="cs-close" onClick={onClose}>×</button>

                <div className="cs-header">
                    <div className="cs-brand-tag">FRESH • LOCAL • GROCERY</div>
                    <h1 className="cs-title">COMING SOON</h1>
                    <p className="cs-subtitle">DELCO FARMERS MARKET</p>
                </div>

                <div className="cs-spacer"></div>

                <div className="cs-info">
                    <h2 className="cs-date">{heading}</h2>
                    <p className="cs-desc">
                        We're preparing a fresh experience for you. 
                        Find artisanal food, local produce, and unique crafts arriving soon at Delco Farmers Market.
                    </p>
                    <button className="cs-confirm-btn" onClick={onClose}>
                       STAY TUNED
                    </button>
                </div>
            </div>
        </div>
    );
}