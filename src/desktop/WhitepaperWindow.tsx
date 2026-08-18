import React from 'react';
import Window from './Window';

export interface WhitepaperWindowProps extends WindowAppProps {}

export const WhitepaperWindow: React.FC<WhitepaperWindowProps> = (props) => {
    const pdfUrl = 'https://bitcoin.org/bitcoin.pdf';

    return (
        <Window
            windowTitle="bitcoin.pdf - Bitcoin Whitepaper PDF Viewer"
            width={780}
            height={560}
            top={40}
            left={50}
            closeWindow={props.onClose}
            minimizeWindow={props.onMinimize}
            onInteract={props.onInteract}
            windowBarIcon="showcaseIcon"
        >
            <div style={styles.container}>
                {/* PDF Reader Toolbar */}
                <div style={styles.toolbar}>
                    <div style={styles.docInfo}>
                        <span style={styles.docTitle}>📄 Bitcoin: A Peer-to-Peer Electronic Cash System</span>
                        <span style={styles.docAuthor}>by Satoshi Nakamoto (Oct 31, 2008)</span>
                    </div>
                    <div style={styles.actions}>
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.downloadBtn}
                        >
                            Open Original PDF ↗
                        </a>
                    </div>
                </div>

                {/* Embedded PDF Viewer */}
                <div style={styles.viewerContainer}>
                    <object
                        data={pdfUrl}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                    >
                        <iframe
                            src={pdfUrl}
                            style={styles.iframe}
                            title="Bitcoin Whitepaper PDF"
                        >
                            <p style={{ padding: 20, color: '#333' }}>
                                Your browser does not support embedded PDFs.
                                <a href={pdfUrl} target="_blank" rel="noopener noreferrer"> Click here to download bitcoin.pdf</a>
                            </p>
                        </iframe>
                    </object>
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
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#d4d0c8',
        padding: '6px 12px',
        borderBottom: '2px solid #808080',
        boxShadow: 'inset 0 1px #fff',
    },
    docInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    docTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000',
    },
    docAuthor: {
        fontSize: 11,
        color: '#555555',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
    },
    downloadBtn: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0000a3',
        backgroundColor: '#ffffff',
        padding: '4px 10px',
        border: '1px solid #808080',
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #404040',
        textDecoration: 'none',
    },
    viewerContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#525659',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
};
