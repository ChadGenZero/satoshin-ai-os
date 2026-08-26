import React, { useEffect, useState } from 'react';
import Window from '../desktop/Window';
import soundEffects from '../utils/SoundEffects';
import '../types/zapier.d';

export interface ChatWindowProps extends WindowAppProps {}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(15);

    useEffect(() => {
        // Dynamically inject Zapier Web Component script if missing
        if (!document.querySelector('script[src*="zapier-interfaces"]')) {
            const script = document.createElement('script');
            script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
            script.type = 'module';
            script.async = true;
            document.head.appendChild(script);
        }

        // Animate loading progress bar
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + Math.floor(Math.random() * 15 + 10);
            });
        }, 120);

        // Guaranteed display timer so user sees the retro loading screen smoothly
        const timer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsLoaded(true);
            }, 150);
        }, 850);

        // Listen for global keydown events during chatbot typing
        const handleKeyDown = (e: KeyboardEvent) => {
            soundEffects.playNextKeyClick();
        };

        window.addEventListener('keydown', handleKeyDown, true);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const attachToChatInput = () => {
            const embed = document.querySelector('zapier-interfaces-chatbot-embed');
            if (!embed) return;

            const shadow = embed.shadowRoot;
            const root = shadow || embed;

            // Target input and textarea elements inside Zapier chatbot web component
            const inputElements = root.querySelectorAll('input, textarea, button, [contenteditable="true"]');

            inputElements.forEach((inputEl) => {
                if (!(inputEl as any).__soundAttached) {
                    (inputEl as any).__soundAttached = true;

                    inputEl.addEventListener('mousedown', () => {
                        soundEffects.playSingleMouseClick();
                    }, true);

                    inputEl.addEventListener('focus', () => {
                        soundEffects.playSingleMouseClick();
                    }, true);

                    inputEl.addEventListener('keydown', () => {
                        soundEffects.playNextKeyClick();
                    }, true);

                    inputEl.addEventListener('input', () => {
                        soundEffects.playNextKeyClick();
                    }, true);
                }
            });
        };

        const interval = setInterval(attachToChatInput, 200);
        return () => clearInterval(interval);
    }, [isLoaded]);

    const handleContainerMouseDown = () => {
        soundEffects.playSingleMouseClick();
    };

    const handleFocus = () => {
        (window as any).__isChatFocused = true;
        soundEffects.playSingleMouseClick();
    };

    const handleBlur = () => {
        (window as any).__isChatFocused = false;
    };

    const handleClose = () => {
        (window as any).__isChatFocused = false;
        soundEffects.playWindowClose();
        props.onClose();
    };

    return (
        <Window
            windowTitle="Talk to Satoshi"
            width={620}
            height={600}
            top={50}
            left={70}
            closeWindow={handleClose}
            minimizeWindow={props.onMinimize}
            onInteract={props.onInteract}
            windowBarIcon="doomIcon"
        >
            <div
                onMouseDown={handleContainerMouseDown}
                style={styles.container}
            >
                {/* Guaranteed Visible Retro Loading Overlay */}
                {!isLoaded && (
                    <div style={styles.loadingOverlay}>
                        <div style={styles.loadingCard}>
                            <div style={styles.spinnerContainer}>
                                <div style={styles.spinnerRing}></div>
                            </div>
                            <div style={styles.loadingTitle}>Loading Satoshin.ai...</div>
                            <div style={styles.loadingSubtitle}>Connecting to Satoshi's consciousness...</div>
                            <div style={styles.progressBarTrack}>
                                <div
                                    style={{
                                        ...styles.progressBarFill,
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div style={styles.chatbotContainer}>
                    <iframe
                        src="https://interfaces.zapier.com/embed/chatbot/cm5bpzpe500624aa7thvjfnej"
                        title="Talk to Satoshi"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                    />
                </div>
            </div>
        </Window>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1e1e',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#141518',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
    },
    loadingCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1f2126',
        border: '2px solid #f7931a',
        borderRadius: 8,
        padding: '28px 36px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
        gap: 12,
        maxWidth: 360,
        width: '100%',
    },
    spinnerContainer: {
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerRing: {
        width: 32,
        height: 32,
        border: '3px solid rgba(247, 147, 26, 0.2)',
        borderTop: '3px solid #f7931a',
        borderRadius: '50%',
        animation: 'satoshiSpin 0.8s linear infinite',
    },
    loadingTitle: {
        color: '#ffffff',
        fontSize: '17px',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        fontFamily: "'Courier Prime', monospace, sans-serif",
    },
    loadingSubtitle: {
        color: '#a0a5b0',
        fontSize: '12px',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    progressBarTrack: {
        width: '100%',
        height: 8,
        backgroundColor: '#2c2f38',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 6,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#f7931a',
        transition: 'width 0.12s linear',
        borderRadius: 4,
    },
    chatbotContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1e1e',
        overflow: 'hidden',
        display: 'flex',
    },
};

export default ChatWindow;
