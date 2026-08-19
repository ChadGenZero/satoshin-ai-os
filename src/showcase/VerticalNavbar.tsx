import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import soundEffects from '../utils/SoundEffects';

const NAV_ITEMS = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/timeline', label: 'Timeline' },
    { path: '/projects', label: 'Projects' },
    { path: '/philosophy', label: 'Philosophy' },
];

const VerticalNavbar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="vertical-navbar-root" style={styles.navbar}>
            <div className="vertical-navbar-brand" style={styles.brand}>SATOSHI</div>
            <div className="vertical-navbar-menu" style={styles.menu}>
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => soundEffects.playSingleMouseClick()}
                            style={{
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {}),
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    navbar: {
        width: 120,
        backgroundColor: '#0a0c10',
        borderRight: '1px solid #2d3748',
        flexDirection: 'column',
        padding: 16,
        boxSizing: 'border-box',
        flexShrink: 0,
    },
    brand: {
        color: '#f7931a',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 2,
        marginBottom: 32,
    },
    menu: {
        flexDirection: 'column',
        gap: 8,
    },
    link: {
        color: '#8899a6',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: 4,
        fontSize: 13,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
    },
    activeLink: {
        color: '#ffffff',
        backgroundColor: '#f7931a',
        fontWeight: 'bold',
    },
};

export default VerticalNavbar;
