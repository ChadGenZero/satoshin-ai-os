import React, { useState } from 'react';
import Window from './Window';
import soundEffects from '../utils/SoundEffects';

export interface UncappedWindowProps extends WindowAppProps {}

export const UncappedWindow: React.FC<UncappedWindowProps> = (props) => {
    const defaultUrl = 'https://www.uncapped.lol/';
    const [urlInput, setUrlInput] = useState(defaultUrl);
    const [iframeUrl, setIframeUrl] = useState(defaultUrl);
    const [iframeKey, setIframeKey] = useState(0);

    const handleRefresh = () => {
        soundEffects.playSingleMouseClick();
        setIframeKey((prev) => prev + 1);
    };

    const handleNavigate = (e: React.FormEvent) => {
        e.preventDefault();
        soundEffects.playSingleMouseClick();
        let target = urlInput.trim();
        if (!target.startsWith('http://') && !target.startsWith('https://')) {
            target = 'https://' + target;
        }
        setIframeUrl(target);
        setUrlInput(target);
    };

    return (
        <Window
            windowTitle="uncapped.lol — Become the Claimant for any asset"
            width={880}
            height={620}
            top={40}
            left={60}
            closeWindow={props.onClose}
            minimizeWindow={props.onMinimize}
            onInteract={props.onInteract}
            windowBarIcon="showcaseIcon"
        >
            <div style={styles.container}>
                {/* Retro Browser Address Bar Header */}
                <div style={styles.addressBarContainer}>
                    <button
                        onClick={handleRefresh}
                        style={styles.navButton}
                        title="Back"
                    >
                        ◄
                    </button>
                    <button
                        onClick={handleRefresh}
                        style={styles.navButton}
                        title="Forward"
                    >
                        ►
                    </button>
                    <button
                        onClick={handleRefresh}
                        style={styles.navButton}
                        title="Refresh"
                    >
                        ↻
                    </button>

                    <form onSubmit={handleNavigate} style={styles.urlForm}>
                        <span style={styles.addressLabel}>Address:</span>
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            style={styles.urlInput}
                        />
                        <button type="submit" style={styles.goButton}>
                            Go
                        </button>
                    </form>

                    <a
                        href={iframeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundEffects.playSingleMouseClick()}
                        style={styles.externalLink}
                        title="Open uncapped.lol in new tab"
                    >
                        Open ↗
                    </a>
                </div>

                {/* Embedded Web Viewport */}
                <div style={styles.viewportContainer}>
                    <iframe
                        key={iframeKey}
                        src={iframeUrl}
                        title="uncapped.lol"
                        style={styles.iframe}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    />
                </div>
            </div>
        </Window>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#c0c0c0',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    addressBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        backgroundColor: '#d4d0c8',
        borderBottom: '2px solid #808080',
        boxShadow: 'inset 0 1px #fff',
        boxSizing: 'border-box',
    },
    navButton: {
        width: 26,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ececec',
        border: '1px solid #808080',
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #404040',
        fontSize: 12,
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
    },
    urlForm: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    addressLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
    },
    urlInput: {
        flex: 1,
        height: 22,
        backgroundColor: '#ffffff',
        border: '1px solid #7f9db9',
        padding: '0 8px',
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#000',
        outline: 'none',
    },
    goButton: {
        height: 24,
        padding: '0 10px',
        backgroundColor: '#ececec',
        border: '1px solid #808080',
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #404040',
        fontSize: 11,
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    externalLink: {
        display: 'flex',
        alignItems: 'center',
        height: 24,
        padding: '0 10px',
        backgroundColor: '#ffffff',
        border: '1px solid #808080',
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #404040',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0000a3',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
    },
    viewportContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
};

export default UncappedWindow;
