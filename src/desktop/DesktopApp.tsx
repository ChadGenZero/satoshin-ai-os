import satoshiThemeLogo from '../assets/satoshiThemeLogo.png';
import bitcoinBlissWallpaper from '../assets/bitcoinBlissWallpaper.jpg';
import BitcoinCoreWindow from './BitcoinCoreWindow';
import ShowcaseExplorer from './ShowcaseExplorer';
import React, { useCallback, useEffect, useState } from 'react';
import Colors from '../theme/colors';
import { LessonsWindow } from '../lessons/LessonsWindow';
import { ChatWindow } from '../chat/ChatWindow';
import { WhitepaperWindow } from './WhitepaperWindow';
import { SettingsWindow } from './SettingsWindow';
import type { IconName } from '../assets/icons';
import DesktopShortcut, { type DesktopShortcutProps } from './DesktopShortcut';
import Toolbar from './Toolbar';
import ShutdownSequence from './ShutdownSequence';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const APPLICATIONS: {
    [key in string]: {
        key: string;
        name: string;
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    showcase: {
        key: 'showcase',
        name: "Satoshi's Archive",
        shortcutIcon: 'showcaseIcon',
        component: ShowcaseExplorer,
    },
    lessons: {
        key: 'lessons',
        name: 'Lessons',
        shortcutIcon: 'computerBig',
        component: LessonsWindow,
    },
    whitepaper: {
        key: 'whitepaper',
        name: 'Bitcoin Whitepaper',
        shortcutIcon: 'windowExplorerIcon',
        component: WhitepaperWindow,
    },
    chat: {
        key: 'chat',
        name: 'Talk to Satoshi',
        shortcutIcon: 'windowGameIcon',
        component: ChatWindow,
    },
    bitcoinCore: {
        key: 'bitcoinCore',
        name: 'Bitcoin Core',
        shortcutIcon: 'bitcoinIcon',
        component: BitcoinCoreWindow,
    },
    settings: {
        key: 'settings',
        name: 'Settings',
        shortcutIcon: 'myComputer',
        component: SettingsWindow,
    },
};

const DesktopApp: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});
    const [desktopTheme, setDesktopTheme] = useState<string>('teal');

    const [scanlines, setScanlines] = useState<boolean>(true);

    useEffect(() => {
        const handleThemeChange = (e: CustomEvent) => {
            if (e.detail) setDesktopTheme(e.detail);
        };
        const handleScanlinesChange = (e: CustomEvent) => {
            setScanlines(e.detail !== undefined ? e.detail : true);
        };
        window.addEventListener('desktopThemeChanged', handleThemeChange as EventListener);
        window.addEventListener('crtScanlinesChanged', handleScanlinesChange as EventListener);
        return () => {
            window.removeEventListener('desktopThemeChanged', handleThemeChange as EventListener);
            window.removeEventListener('crtScanlinesChanged', handleScanlinesChange as EventListener);
        };
    }, []);

    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
    }, [shutdown]);

    useEffect(() => {
                const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];
            newShortcuts.push({
                shortcutName: app.name,
                icon: app.shortcutIcon,
                onOpen: () => {
                    addWindow(
                        app.key,
                        <app.component
                            onInteract={() => onWindowInteract(app.key)}
                            onMinimize={() => minimizeWindow(app.key)}
                            onClose={() => removeWindow(app.key)}
                            key={app.key}
                        />
                    );
                },
            });
        });

        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === "Satoshi's Archive") {
                shortcut.onOpen();
            }
        });

        setShortcuts(newShortcuts);
    }, []);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: 1 + getHighestZIndex(),
                },
            }));
        },
        [setWindows, getHighestZIndex]
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: React.JSX.Element) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: getHighestZIndex() + 1,
                    minimized: false,
                    component: element,
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [getHighestZIndex]
    );

    return !shutdown ? (
        <div style={{
        ...styles.desktop,
        backgroundColor: desktopTheme === 'satoshi' ? '#000000' :
                         desktopTheme === 'matrix' ? '#041804' :
                         desktopTheme === 'amber' ? '#180f04' :
                         desktopTheme === 'charcoal' ? '#202228' : Colors.turquoise
    }}>
        {desktopTheme === 'bliss' && (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                backgroundColor: '#387be3',
            }}>
                <img
                    src={bitcoinBlissWallpaper}
                    alt="Bitcoin Bliss Wallpaper"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                    }}
                />
            </div>
        )}
        {desktopTheme === 'satoshi' && (
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0,
            }}>
                <img
                    src={satoshiThemeLogo}
                    alt="Satoshi Emblem"
                    style={{
                        maxWidth: '85vw',
                        maxHeight: '85vh',
                        width: 660,
                        height: 660,
                        objectFit: 'contain',
                    }}
                />
            </div>
        )}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element as any, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    const isSmallScreen = typeof window !== 'undefined' && window.innerHeight < 700;
                    const stepY = isSmallScreen ? 78 : 104;
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, {
                                top: i * stepY,
                            })}
                            key={shortcut.shortcutName}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
            />
            {scanlines && (
                <div
                    className="crt-scanline-animated"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        pointerEvents: 'none',
                        zIndex: 99999999,
                        background: `
                            linear-gradient(
                                rgba(18, 16, 16, 0) 50%,
                                rgba(0, 0, 0, 0.07) 50%
                            ),
                            radial-gradient(
                                circle at center,
                                rgba(0, 0, 0, 0) 70%,
                                rgba(0, 0, 0, 0.15) 100%
                            )
                        `,
                        backgroundSize: '100% 4px, 100% 100%',
                    }}
                />
            )}
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: Colors.turquoise,
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: Colors.turquoise,
    },
    shortcutContainer: {
        position: 'absolute',
    },
    shortcuts: {
        position: 'absolute',
        top: 36,
        left: 32,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default DesktopApp;
