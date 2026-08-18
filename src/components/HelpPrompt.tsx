import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import UIEventBus from './EventBus';
import soundEffects from '../utils/SoundEffects';

const HELP_TEXT = 'CLICK anywhere to begin';

type HelpPromptProps = {};

const HelpPrompt: React.FC<HelpPromptProps> = () => {
    const [helpText, setHelpText] = useState('');
    const [visible, setVisible] = useState(true);
    const visRef = useRef(visible);

    const typeHelpText = (i: number, curText: string) => {
        if (i < HELP_TEXT.length && visRef.current) {
            setTimeout(() => {
                window.postMessage(
                    { type: 'keydown', key: `_AUTO_${HELP_TEXT[i]}` },
                    '*'
                );
                soundEffects.playNextKeyClick();

                setHelpText(curText + HELP_TEXT[i]);
                typeHelpText(i + 1, curText + HELP_TEXT[i]);
            }, Math.random() * 120 + 50);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            typeHelpText(0, '');
        }, 500);

        const handleMouseDown = () => {
            setVisible(false);
        };

        document.addEventListener('mousedown', handleMouseDown);
        UIEventBus.on('enterMonitor', () => {
            setVisible(false);
        });

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    useEffect(() => {
        if (visible === false) {
            window.postMessage({ type: 'keydown', key: '_AUTO_' }, '*');
        }
        visRef.current = visible;
    }, [visible]);

    if (!visible) return null;

    return helpText.length > 0 ? (
        <motion.div
            variants={vars}
            initial="visible"
            animate={visible ? 'visible' : 'hide'}
            style={styles.container}
        >
            <p style={{ color: '#ffffff', fontFamily: "'ocr-a-std', 'Courier Prime', Consolas, Monaco, 'Courier New', monospace", fontSize: '16px', margin: 0, padding: 0 }}>
                {helpText}
            </p>
            <div style={styles.blinkingContainer}>
                <span className="blinking-cursor-white">_</span>
            </div>
        </motion.div>
    ) : null;
};

const vars = {
    visible: {
        opacity: 1,
        x: '-50%',
    },
    hide: {
        opacity: 0,
        x: '-50%',
        transition: {
            duration: 0.05,
        },
    },
};

const styles: StyleSheetCSS = {
    container: {
        position: 'absolute',
        bottom: 64,
        left: '50%',
        background: 'black',
        padding: '4px 16px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        border: 'none',
        boxShadow: 'none',
    },
    blinkingContainer: {
        marginLeft: 8,
        display: 'flex',
        alignItems: 'center',
    },
};

export default HelpPrompt;
