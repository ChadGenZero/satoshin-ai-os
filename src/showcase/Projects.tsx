import React from 'react';

const PROJECTS = [
    {
        title: 'Bitcoin Core Protocol',
        tag: 'P2P Network',
        desc: 'The original C++ implementation of the Bitcoin client, consensus engine, and full node code.',
    },
    {
        title: 'Proof-of-Work Consensus',
        tag: 'SHA-256 Engine',
        desc: 'Adapting Hashcash into a distributed consensus mechanism to solve double-spending without central servers.',
    },
    {
        title: 'Elliptic Curve Signatures',
        tag: 'ECDSA (secp256k1)',
        desc: 'Asymmetric cryptography allowing wallet owners to cryptographically sign and broadcast transactions.',
    },
    {
        title: 'Bitcoin Whitepaper',
        tag: 'Academic Document',
        desc: 'The 9-page foundational paper outlining the complete design of peer-to-peer electronic cash.',
    },
];

const Projects: React.FC = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Core Innovations</h2>
            <div style={styles.grid}>
                {PROJECTS.map((p, i) => (
                    <div key={i} style={styles.card}>
                        <span style={styles.tag}>{p.tag}</span>
                        <h3 style={styles.cardTitle}>{p.title}</h3>
                        <p style={styles.cardDesc}>{p.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        flex: 1,
        backgroundColor: '#111318',
        color: '#e0e0e0',
        padding: 28,
        flexDirection: 'column',
        overflowY: 'auto',
    },
    title: {
        fontSize: 24,
        color: '#f7931a',
        margin: '0 0 20px 0',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
    },
    card: {
        backgroundColor: '#1b2028',
        border: '1px solid #2d3748',
        borderRadius: 4,
        padding: 16,
        flexDirection: 'column',
    },
    tag: {
        fontSize: 11,
        color: '#f7931a',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    cardTitle: {
        margin: '0 0 8px 0',
        color: '#ffffff',
        fontSize: 16,
    },
    cardDesc: {
        margin: 0,
        color: '#a0aec0',
        fontSize: 13,
        lineHeight: 1.5,
    },
};

export default Projects;
