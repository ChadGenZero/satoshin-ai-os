import React, { useState } from 'react';
import Window from './Window';

export interface SettingsWindowProps extends WindowAppProps {}

interface ThemeOption {
    value: string;
    label: string;
}

const THEMES: ThemeOption[] = [
    { value: 'teal', label: 'Retro Turquoise (Teal)' },
    { value: 'bliss', label: 'Bitcoin Bliss (Satoshi Hill)' },
    { value: 'satoshi', label: 'Satoshi Theme (Dark + Emblem)' },
    { value: 'matrix', label: 'Matrix Code (Green)' },
    { value: 'amber', label: 'Golden Satoshi (Amber)' },
    { value: 'charcoal', label: 'Classic Charcoal' },
];

export const SettingsWindow: React.FC<SettingsWindowProps> = (props) => {
    const [volume, setVolume] = useState(50);
    const [jitter, setJitter] = useState(true);
    const [scanlines, setScanlines] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState<string>('teal');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setVolume(val);
        window.dispatchEvent(new CustomEvent('ambientVolumeChanged', { detail: val / 100 }));
    };

    const handleJitterChange = () => {
        setJitter(!jitter);
        window.dispatchEvent(new CustomEvent('crtJitterChanged', { detail: !jitter }));
    };

    const handleScanlinesChange = () => {
        setScanlines(!scanlines);
        window.dispatchEvent(new CustomEvent('crtScanlinesChanged', { detail: !scanlines }));
    };

    const selectTheme = (themeValue: string) => {
        setSelectedTheme(themeValue);
        setIsDropdownOpen(false);
        window.dispatchEvent(new CustomEvent('desktopThemeChanged', { detail: themeValue }));
    };

    const currentThemeLabel = THEMES.find((t) => t.value === selectedTheme)?.label || 'Retro Turquoise (Teal)';

    return (
        <Window
            windowTitle="Settings Panel"
            width={410}
            height={270}
            top={90}
            left={90}
            closeWindow={props.onClose}
            minimizeWindow={props.onMinimize}
            onInteract={props.onInteract}
            windowBarIcon="credits"
        >
            <div style={styles.container}>
                <h3 style={styles.title}>System Configuration</h3>

                <div style={styles.settingRow}>
                    <label style={styles.label}>Ambient Volume:</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={styles.slider}
                    />
                    <span style={styles.valueText}>{volume}%</span>
                </div>

                <div style={styles.settingRow}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={jitter}
                            onChange={handleJitterChange}
                            style={styles.checkbox}
                        />
                        Enable Monitor Jitter Screen Distortion
                    </label>
                </div>

                <div style={styles.settingRow}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={scanlines}
                            onChange={handleScanlinesChange}
                            style={styles.checkbox}
                        />
                        Enable Retro CRT Scanlines Overlay
                    </label>
                </div>

                {/* Custom Retro Dropdown */}
                <div style={styles.settingRowRelative}>
                    <label style={styles.label}>Desktop Theme:</label>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            style={styles.dropdownTrigger}
                        >
                            <span style={{ flex: 1, paddingLeft: 6, fontSize: 12, fontWeight: 'bold' }}>
                                {currentThemeLabel}
                            </span>
                            <div style={styles.dropdownArrowButton}>
                                ▾
                            </div>
                        </div>

                        {isDropdownOpen && (
                            <div style={styles.dropdownMenu}>
                                {THEMES.map((th) => (
                                    <div
                                        key={th.value}
                                        onClick={() => selectTheme(th.value)}
                                        style={Object.assign(
                                            {},
                                            styles.dropdownMenuItem,
                                            selectedTheme === th.value && styles.dropdownMenuItemActive
                                        )}
                                    >
                                        {th.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles = {
    container: {
        padding: '14px 16px',
        backgroundColor: '#c0c0c0',
        width: '100%',
        height: '100%',
        flex: 1,
        boxSizing: 'border-box',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'visible',
    },
    title: {
        fontSize: '15px',
        margin: '0 0 2px 0',
        borderBottom: '2px solid #808080',
        paddingBottom: '4px',
        fontWeight: 'bold',
    },
    settingRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
    },
    settingRowRelative: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        position: 'relative',
        zIndex: 50,
    },
    label: {
        fontSize: '12px',
        fontWeight: 'bold',
        width: '125px',
    },
    slider: {
        flex: 1,
        cursor: 'pointer',
    },
    valueText: {
        fontSize: '12px',
        fontWeight: 'bold',
        width: '36px',
        textAlign: 'right',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    checkbox: {
        width: '14px',
        height: '14px',
        cursor: 'pointer',
    },
    dropdownTrigger: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        border: '2px solid #000000',
        boxShadow: 'inset -1px -1px #fff, inset 1px 1px #808080',
        height: 24,
        cursor: 'pointer',
        userSelect: 'none',
    },
    dropdownArrowButton: {
        width: 20,
        height: '100%',
        backgroundColor: '#c0c0c0',
        borderLeft: '1px solid #808080',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 'bold',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 26,
        left: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        border: '2px solid #000000',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
    },
    dropdownMenuItem: {
        padding: '6px 8px',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
    },
    dropdownMenuItemActive: {
        backgroundColor: '#000080',
        color: '#ffffff',
    },
} as const;
