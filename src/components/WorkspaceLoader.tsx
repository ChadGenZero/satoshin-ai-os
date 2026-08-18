import React, { useCallback, useEffect, useRef, useState } from 'react';
import eventBus from './EventBus';
import soundEffects from '../utils/SoundEffects';

type LoadingProps = {};

type ResourceItem = {
    name: string;
    percent: number;
};

const WorkspaceLoader: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [toLoad, setToLoad] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [overlayOpacity, setLoadingOverlayOpacity] = useState(1);
    const [loadingTextOpacity, setLoadingTextOpacity] = useState(1);
    const [startPopupOpacity, setStartPopupOpacity] = useState(0);
    const [webGLErrorOpacity, setWebGLErrorOpacity] = useState(0);

    // Staged boot sequence
    const [bootStage, setBootStage] = useState(0);
    const [displayedResources, setDisplayedResources] = useState<ResourceItem[]>([]);
    const resourceQueueRef = useRef<ResourceItem[]>([]);
    const isResourceLoadedRef = useRef(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [webGLError, setWebGLError] = useState(false);
    const [mobileWarning, setMobileWarning] = useState(window.innerWidth < 768);

    const onResize = () => {
        if (window.innerWidth < 768) {
            setMobileWarning(true);
        } else {
            setMobileWarning(false);
        }
    };

    window.addEventListener('resize', onResize);

    // 1. Initial BIOS Boot Stages (simulating vintage POST check delays)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            start();
            return;
        }
        if (!detectWebGLContext()) {
            setWebGLError(true);
            return;
        }

        const t1 = setTimeout(() => setBootStage(1), 300);
        const t2 = setTimeout(() => setBootStage(2), 700);
        const t3 = setTimeout(() => setBootStage(3), 1100);
        const t4 = setTimeout(() => setBootStage(4), 1600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    // 2. Resource loader event listener
    useEffect(() => {
        const handleLoadedSource = (data: any) => {
            setProgress(data.progress);
            setToLoad(data.toLoad);
            setLoaded(data.loaded);

            const newItem: ResourceItem = {
                name: data.sourceName,
                percent: Math.round(data.progress * 100),
            };

            resourceQueueRef.current.push(newItem);

            if (data.progress >= 1) {
                isResourceLoadedRef.current = true;
            }
        };

        eventBus.on('loadedSource', handleLoadedSource);
    }, []);

    // 3. Staged Resource Consumer (drains resource queue silently)
    useEffect(() => {
        if (bootStage < 4) return;

        const interval = setInterval(() => {
            if (resourceQueueRef.current.length > 0) {
                const nextItem = resourceQueueRef.current.shift()!;
                setDisplayedResources((prev) => {
                    const updated = [...prev, nextItem];
                    if (updated.length > 8) {
                        updated.shift();
                    }
                    return updated;
                });
            } else if (isResourceLoadedRef.current && !doneLoading) {
                setDoneLoading(true);
                clearInterval(interval);

                setTimeout(() => {
                    setLoadingTextOpacity(0);
                    setTimeout(() => {
                        setStartPopupOpacity(1);
                    }, 500);
                }, 1200);
            }
        }, 350);

        return () => clearInterval(interval);
    }, [bootStage, doneLoading]);

    useEffect(() => {
        if (webGLError) {
            setTimeout(() => {
                setWebGLErrorOpacity(1);
            }, 500);
        }
    }, [webGLError]);

    const start = useCallback(() => {
        setLoadingOverlayOpacity(0);
        eventBus.dispatch('loadingScreenDone', {});
        const ui = document.getElementById('ui');
        if (ui) {
            ui.style.pointerEvents = 'none';
        }
    }, []);

    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const monthFormatted = month < 10 ? `0${month}` : month;
        const dayFormatted = day < 10 ? `0${day}` : day;
        return `${monthFormatted}/${dayFormatted}/${year}`;
    };

    const detectWebGLContext = () => {
        var canvas = document.createElement('canvas');
        var gl =
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl');
        if (gl && gl instanceof WebGLRenderingContext) {
            return true;
        }
        return false;
    };

    return (
        <div
            style={Object.assign({}, styles.overlay, {
                opacity: overlayOpacity,
            })}
            id="loading-screen"
        >
            {loadingTextOpacity > 0 && (
                <div
                    style={Object.assign({}, styles.overlayText, {
                        opacity: loadingTextOpacity,
                    })}
                >
                    <div
                        style={styles.header}
                        className="loading-screen-header"
                    >
                        <p style={{ color: '#F7931A', width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', margin: 0 }}>
                            <span>Satoshin.ai</span>
                            <span>Released: 01/03/2009</span>
                            <span>NAKAMOTO BIOS (C) 2009 Satoshi Labs</span>
                        </p>
                    </div>
                    <div style={styles.body} className="loading-screen-body">
                        {bootStage >= 1 && (
                            <p style={{ color: '#F7931A', margin: '3px 0' }}>
                                BITCOIN GENESIS OS V1 2009-2026 Digital Preservation System
                            </p>
                        )}
                        {bootStage >= 2 && (
                            <p style={{ color: '#F7931A', margin: '3px 0' }}>
                                Satoshi Consensus Engine V1
                            </p>
                        )}
                        {bootStage >= 3 && (
                            <p style={{ color: '#F7931A', margin: '3px 0' }}>
                                Checking Cryptographic Proofs : 21000000 OK
                            </p>
                        )}
                        {bootStage >= 4 && (
                            <>
                                <div style={styles.spacer} />
                                <p className="loading" style={{ color: '#F7931A', margin: '3px 0' }}>
                                    BOOTING SATOSHI CONSCIOUSNESS ({loaded}/
                                    {toLoad === 0 ? '19' : toLoad})..
                                </p>
                            </>
                        )}
                        <div style={styles.spacer} />
                        <div style={styles.resourcesLoadingList}>
                            {displayedResources.map((item, idx) => (
                                <div key={idx} className="boot-resource-row">
                                    <span className="boot-resource-name">Loaded {item.name}</span>
                                    <span className="boot-resource-dots">...</span>
                                    <span className="boot-resource-percent">{item.percent}%</span>
                                </div>
                            ))}
                        </div>
                        <div style={styles.spacer} />
                        <span className="blinking-cursor">_</span>
                    </div>
                    <div
                        style={styles.footer}
                        className="loading-screen-footer"
                    >
                        <p style={{ color: '#F7931A', margin: '2px 0' }}>Press DEL for Configuration</p>
                        <p style={{ color: '#F7931A', margin: '2px 0' }}>Press ESC to Continue</p>
                    </div>
                </div>
            )}
            <div
                style={Object.assign({}, styles.popupContainer, {
                    opacity: startPopupOpacity,
                })}
            >
                <div style={styles.startPopup} onClick={start}>
                    <p style={{ color: '#F7931A', fontSize: '20px', fontWeight: 'bold' }}>
                        Satoshi Nakamoto's Office
                    </p>
                    <p style={{ color: '#F7931A', marginTop: '6px', fontSize: '14px' }}>
                        Home of Satoshi's Digitally Preserved Conscience — Satoshin.ai v1.0
                    </p>
                    {mobileWarning && (
                        <>
                            <br />
                            <b>
                                <p style={styles.warning}>
                                    WARNING: This experience is best viewed on
                                </p>
                                <p style={styles.warning}>
                                    a desktop or laptop computer.
                                </p>
                            </b>
                            <br />
                        </>
                    )}
                    
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '24px',
                            gap: '12px',
                        }}
                    >
                        <div className="bios-start-button" onClick={start}>
                            <p style={{ color: '#F7931A', fontWeight: 'bold' }}>START</p>
                        </div>
                        <p style={{ color: '#F7931A', fontSize: '13px', margin: 0, textAlign: 'center' }}>
                            <a
                                href="http://satoshin.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    soundEffects.playSingleMouseClick();
                                }}
                                style={{
                                    color: '#F7931A',
                                    textDecoration: 'underline',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                            >
                                Click here
                            </a>{' '}
                            for the non-3D experience.
                        </p>
                    </div>
                </div>
            </div>
            {webGLError && (
                <div
                    style={Object.assign({}, styles.popupContainer, {
                        opacity: webGLErrorOpacity,
                    })}
                >
                    <div style={styles.startPopup}>
                        <p style={{ color: '#F7931A' }}>
                            <b style={{ color: 'red' }}>CRITICAL ERROR:</b> No
                            WebGL Detected
                        </p>
                        <div style={styles.spacer} />
                        <div style={styles.spacer} />

                        <p style={{ color: '#F7931A' }}>WebGL is required to run this site.</p>
                        <p style={{ color: '#F7931A' }}>
                            Please enable it or switch to a browser which
                            supports WebGL
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    overlay: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        transition: 'opacity 0.2s, transform 0.2s',
        MozTransition: 'opacity 0.2s, transform 0.2s',
        WebkitTransition: 'opacity 0.2s, transform 0.2s',
        OTransition: 'opacity 0.2s, transform 0.2s',
        msTransition: 'opacity 0.2s, transform 0.2s',

        transitionTimingFunction: 'ease-in-out',
        MozTransitionTimingFunction: 'ease-in-out',
        WebkitTransitionTimingFunction: 'ease-in-out',
        OTransitionTimingFunction: 'ease-in-out',
        msTransitionTimingFunction: 'ease-in-out',

        boxSizing: 'border-box',
        fontSize: 16,
        letterSpacing: 0.8,
    },

    spacer: {
        height: 16,
    },
    header: {
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
    },
    popupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning: {
        color: '#F7931A',
    },
    blinkingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: '24px 28px',
    },
    startPopup: {
        backgroundColor: '#000',
        padding: 24,
        border: '4px solid #F7931A',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 500,
    },
    headerInfo: {
        marginLeft: 64,
    },
    red: {
        color: '#F7931A',
    },
    link: {
        color: '#F7931A',
        cursor: 'pointer',
    },
    overlayText: {
        width: '100%',
        height: '100%',
        maxWidth: '840px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        flex: 1,
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    resourcesLoadingList: {
        display: 'flex',
        paddingLeft: 32,
        paddingBottom: 32,
        flexDirection: 'column',
    },
    logoImage: {
        width: 64,
        height: 42,
        imageRendering: 'pixelated',
        marginRight: 16,
    },
    footer: {
        boxSizing: 'border-box',
        width: '100%',
    },
};

export default WorkspaceLoader;
