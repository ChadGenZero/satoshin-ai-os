import type { IconName } from '../assets/icons';

export interface ShortcutItem {
    id: string;
    name: string;
    icon: IconName;
}

export const desktopShortcuts: ShortcutItem[] = [
    { id: 'lessons', name: 'Lessons', icon: 'computerBig' },
    { id: 'whitepaper', name: 'Bitcoin Whitepaper', icon: 'showcaseIcon' },
    { id: 'chat', name: 'Talk to Satoshi', icon: 'windowGameIcon' },
    { id: 'settings', name: 'Settings', icon: 'credits' }
];
