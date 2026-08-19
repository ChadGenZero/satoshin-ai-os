import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Window from './Window';
import Home from '../showcase/Home';
import About from '../showcase/About';
import Timeline from '../showcase/Timeline';
import Projects from '../showcase/Projects';
import Philosophy from '../showcase/Philosophy';
import VerticalNavbar from '../showcase/VerticalNavbar';

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    return (
        <Window
            top={24}
            left={56}
            width={850}
            height={550}
            windowTitle="Satoshi Nakamoto - Archive Explorer"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'satoshin.ai © 2009'}
        >
            <MemoryRouter>
                <div className="showcase-explorer-root" style={{ flex: 1, display: 'flex', width: '100%', height: '100%' }}>
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/timeline" element={<Timeline />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/philosophy" element={<Philosophy />} />
                    </Routes>
                </div>
            </MemoryRouter>
        </Window>
    );
};

export default ShowcaseExplorer;
