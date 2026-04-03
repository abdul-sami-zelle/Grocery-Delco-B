"use client";
import { useState, useEffect } from "react";
import "./style.css";

// We pass isOpen (boolean) and onClose (function) as props
export default function ComingSoonPopup({ isOpen, onClose }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

    useEffect(() => {
        if (!isOpen) return; // Don't start timer if popup is closed

        const target = new Date("April 17, 2026 00:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                clearInterval(interval);
                onClose(); // Automatically close if time is up
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    mins: Math.floor((difference / 1000 / 60) % 60),
                    secs: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, onClose]);

    // If the parent says it's not open, render nothing
    if (!isOpen) return null;

    return (
        <div className="cs-overlay">
            <div className="cs-card">
                {/* Use the onClose prop here */}
                <button className="cs-close" onClick={onClose}>×</button>

                <div className="cs-header">
                    <div className="cs-brand-tag">FRESH • LOCAL • GROCERY</div>
                    <h1 className="cs-title">GRAND OPENING</h1>
                    <p className="cs-subtitle">DELCO FARMERS MARKET</p>
                </div>

                <div className="cs-timer-row">
                    <div className="cs-time-box">
                        <span className="cs-val">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="cs-lab">DAYS</span>
                    </div>
                    <span className="cs-dots">:</span>
                    <div className="cs-time-box">
                        <span className="cs-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="cs-lab">HOURS</span>
                    </div>
                    <span className="cs-dots">:</span>
                    <div className="cs-time-box">
                        <span className="cs-val">{String(timeLeft.mins).padStart(2, '0')}</span>
                        <span className="cs-lab">MINS</span>
                    </div>
                    <span className="cs-dots">:</span>
                    <div className="cs-time-box">
                        <span className="cs-val">{String(timeLeft.secs).padStart(2, '0')}</span>
                        <span className="cs-lab">SECS</span>
                    </div>
                </div>

                <div className="cs-info">
                    <h2 className="cs-date">FRIDAY • APRIL 17TH</h2>
                    <p className="cs-desc">
                        Find fresh produce, artisanal food, restaurants, shops and crafts at Delco Farmers Market
                    </p>
                    <button className="cs-confirm-btn" onClick={onClose}>
                        SAVE THE DATE
                    </button>
                </div>
            </div>
        </div>
    );
}