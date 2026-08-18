import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import colors from '../theme/colors';

export const WhitepaperInspectTooltip: React.FC = () => {
    const [tooltip, setTooltip] = useState<{ hover: boolean; x: number; y: number }>({ hover: false, x: 0, y: 0 });
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        const handleHover = (e: any) => {
            if (e.detail) {
                setTooltip(e.detail);
            }
        };

        const handleModalOpen = () => {
            setModalActive(true);
        };

        const checkModalState = () => {
            if (!(window as any).__whitepaperModalActive) {
                setModalActive(false);
            }
        };

        window.addEventListener('whitepaperHover', handleHover);
        window.addEventListener('whitepaperModalOpen', handleModalOpen);
        const interval = setInterval(checkModalState, 150);

        return () => {
            window.removeEventListener('whitepaperHover', handleHover);
            window.removeEventListener('whitepaperModalOpen', handleModalOpen);
            clearInterval(interval);
        };
    }, []);

    // Instantly hide inspect tooltip whenever modal popup or other modals are active
    if (!tooltip.hover || modalActive || (window as any).__whitepaperModalActive || (window as any).__ledgerModalActive || (window as any).__coffeeModalActive) return null;

    return (
        <div
            style={{
                position: 'fixed',
                left: tooltip.x + 18,
                top: tooltip.y - 34,
                backgroundColor: '#000000',
                border: '1.5px solid #ffffff',
                boxShadow: '0 4px 14px rgba(255, 255, 255, 0.35)',
                padding: '4px 10px',
                pointerEvents: 'none',
                zIndex: 9999999,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                borderRadius: 2,
            }}
        >
            <span
                style={{
                    color: '#ffffff',
                    fontFamily: "'ocr-a-std', 'Courier Prime', Consolas, Monaco, monospace",
                    fontSize: 12,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                }}
            >
                Inspect?
            </span>
            <span className="blinking-cursor-white" style={{ fontSize: 11, margin: 0, color: '#ffffff' }}>_</span>
        </div>
    );
};

import soundEffects from '../utils/SoundEffects';

const WhitepaperToast: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    useEffect(() => {
        const handleOpen = () => {
            window.postMessage({ type: 'keydown', key: '_AUTO_' }, '*');
            (window as any).__whitepaperModalActive = true;
            setIsOpen(true);

            // Hide hover cursor tooltip on click
            window.dispatchEvent(new CustomEvent('whitepaperHover', { detail: { hover: false } }));
        };

        window.addEventListener('whitepaperModalOpen', handleOpen);
        return () => {
            window.removeEventListener('whitepaperModalOpen', handleOpen);
        };
    }, []);

    const handleClose = () => {
        soundEffects.playWindowClose();
        setIsOpen(false);
        if (document.body) document.body.style.cursor = 'default';
        if (document.documentElement) document.documentElement.style.cursor = 'default';
        const cssElem = document.getElementById('css');
        if (cssElem) cssElem.style.cursor = 'default';

        setTimeout(() => {
            (window as any).__whitepaperModalActive = false;
            window.dispatchEvent(new CustomEvent('whitepaperHover', { detail: { hover: false } }));
        }, 500);
    };

    return (
        <>
            <WhitepaperInspectTooltip />
            <AnimatePresence>
                {isOpen && (
                    <div style={styles.modalOverlay}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={styles.cardBox}
                        >
                            {/* Blue Header Banner matching desktop app window header color (#0000a3) */}
                            <div style={styles.blueHeader}>
                                <span style={styles.headerBracket}>[ WHITEPAPER ]</span>
                                <span style={styles.headerTitle}>BITCOIN</span>
                            </div>

                            {/* Card Content Body matching white popup theme */}
                            <div style={styles.cardBody}>
                                <h3 style={styles.foundTitle}>Bitcoin: A Peer-to-Peer Electronic Cash System</h3>
                                <p style={styles.descriptionText}>
                                    PUBLISHED BY SATOSHI NAKAMOTO ON OCTOBER 31, 2008.
                                </p>
                                <p style={styles.descriptionText}>
                                    THE ORIGINAL BLUEPRINT FOR DECENTRALIZED DIGITAL CASH AND BLOCKCHAIN TECHNOLOGY.
                                </p>

                                {/* Retro Action Button with hover state */}
                                <button
                                    onClick={handleClose}
                                    onMouseEnter={() => setIsCloseHovered(true)}
                                    onMouseLeave={() => setIsCloseHovered(false)}
                                    style={{
                                        ...styles.closeButton,
                                        backgroundColor: isCloseHovered ? '#0000a3' : '#f3f4f6',
                                        color: isCloseHovered ? '#ffffff' : '#111827',
                                        borderColor: isCloseHovered ? '#0000a3' : '#9ca3af',
                                    }}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const styles: StyleSheetCSS = {
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
    },
    cardBox: {
        width: 380,
        backgroundColor: '#ffffff',
        border: '1px solid #c3c6ca',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
        color: '#111827',
        fontFamily: "'ocr-a-std', 'Courier Prime', Consolas, Monaco, monospace",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 3,
    },
    blueHeader: {
        backgroundColor: colors.blue, // Windows 95 app window title bar dark blue (#0000a3)
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        letterSpacing: 1.5,
    },
    headerBracket: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    headerTitle: {
        fontSize: 13,
        color: '#ffffff',
        opacity: 0.9,
    },
    cardBody: {
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
    },
    foundTitle: {
        margin: 0,
        fontSize: 15,
        color: '#d97706',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        lineHeight: 1.4,
    },
    descriptionText: {
        margin: 0,
        fontSize: 11,
        lineHeight: 1.6,
        color: '#374151',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    closeButton: {
        marginTop: 10,
        border: '1px solid #9ca3af',
        padding: '10px 16px',
        fontFamily: "'ocr-a-std', 'Courier Prime', Consolas, Monaco, monospace",
        fontSize: 12,
        letterSpacing: 2,
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: 2,
        outline: 'none',
        transition: 'all 0.15s ease',
    },
};

export default WhitepaperToast;
