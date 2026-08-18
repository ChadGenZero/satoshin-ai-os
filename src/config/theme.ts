export interface ThemeConfig {
    name: string;
    logo: string;
    desktopWallpaper: string;
    fonts: {
        monospace: string;
        retro: string;
    };
    colors: {
        desktopBackground: string;
        toolbarBackground: string;
        windowHeader: string;
        windowHeaderActive: string;
        textLight: string;
        textDark: string;
    };
}

export const theme: ThemeConfig = {
    name: 'SATOSHIN.AI',
    logo: 'Satoshi Nakamoto\'s Workspace',
    desktopWallpaper: '',
    fonts: {
        monospace: 'monospace',
        retro: 'Millennium, sans-serif',
    },
    colors: {
        desktopBackground: '#008080',
        toolbarBackground: '#c0c0c0',
        windowHeader: '#808080',
        windowHeaderActive: '#000080',
        textLight: '#ffffff',
        textDark: '#000000',
    }
};
