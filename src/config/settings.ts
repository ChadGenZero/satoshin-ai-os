export interface SettingsConfig {
    defaultVolume: number;
    zoomSpeed: number;
    mouseSensitivity: number;
    crtJitter: boolean;
    scanlines: boolean;
}

export const settingsConfig: SettingsConfig = {
    defaultVolume: 0.5,
    zoomSpeed: 1.0,
    mouseSensitivity: 1.0,
    crtJitter: true,
    scanlines: true,
};
