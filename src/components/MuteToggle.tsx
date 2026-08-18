import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import UIEventBus from './EventBus';
import { Easing } from './Animation';
import soundEffects from '../utils/SoundEffects';
// @ts-ignore
const volumeOn = '/assets/textures/UI/volume_on.svg';
// @ts-ignore
const volumeOff = '/assets/textures/UI/volume_off.svg';

interface MuteToggleProps {}

const MuteToggle: React.FC<MuteToggleProps> = ({}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [muted, setMuted] = useState(false);

    const onMouseDownHandler = useCallback(
        (event) => {
            soundEffects.playSingleMouseClick();
            setIsActive(true);
            event.preventDefault();
            setMuted(!muted);
        },
        [muted]
    );

    const onMouseUpHandler = useCallback(() => {
        setIsActive(false);
    }, []);

    useEffect(() => {
        UIEventBus.dispatch('muteToggle', muted);
    }, [muted]);

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={styles.container}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            className="icon-control-container"
            id="prevent-click"
        >
            <motion.img
                id="prevent-click"
                src={muted ? volumeOff : volumeOn}
                style={{ opacity: isActive ? 0.2 : isHovering ? 0.8 : 1 }}
                width={window.innerWidth < 768 ? 8 : 10}
                animate={
                    isActive ? 'active' : isHovering ? 'hovering' : 'default'
                }
                variants={iconVars}
            />
        </div>
    );
};

const iconVars = {
    hovering: {
        // scale: 1.2,
        opacity: 0.8,
        transition: {
            duration: 0.1,
            ease: 'easeOut' as any,
        },
    },
    active: {
        scale: 0.8,
        opacity: 0.5,
        transition: {
            duration: 0.1,
            ease: Easing.expOut as any,
        },
    },
    default: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut' as any,
        },
    },
};

const styles: StyleSheetCSS = {
    container: {
        background: 'black',
        // padding: 4,
        // paddingLeft: 8,
        // paddingRight: 8,
        textAlign: 'center',
        display: 'flex',
        // position: 'absolute',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
};

export default MuteToggle;
