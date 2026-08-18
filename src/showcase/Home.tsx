import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Satoshi Nakamoto</h1>
                <h3 style={styles.subtitle}>Creator of Bitcoin & Decentralized P2P Cash</h3>
            </div>

            <div style={styles.genesisBox}>
                <p style={styles.genesisLabel}>THE GENESIS BLOCK MSG (Block #0):</p>
                <blockquote style={styles.quote}>
                    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
                </blockquote>
            </div>

            <div style={styles.section}>
                <p style={styles.paragraph}>
                    Welcome to Satoshi's Archive. On October 31, 2008, a paper titled 
                    <span style={styles.highlight}> "Bitcoin: A Peer-to-Peer Electronic Cash System"</span> 
                    was published to the Cryptography Mailing List.
                </p>
                <p style={styles.paragraph}>
                    This system introduced a solution to the double-spending problem using a peer-to-peer 
                    distributed network based on Proof of Work consensus.
                </p>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        flex: 1,
        backgroundColor: '#111318',
        color: '#ffffff',
        padding: 32,
        flexDirection: 'column',
        overflowY: 'auto',
    },
    header: {
        flexDirection: 'column',
        borderBottom: '2px solid #f7931a',
        paddingBottom: 16,
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        color: '#f7931a',
        margin: 0,
        fontFamily: 'serif',
    },
    subtitle: {
        fontSize: 16,
        color: '#b0c4de',
        margin: '8px 0 0 0',
        fontWeight: 'normal',
    },
    genesisBox: {
        backgroundColor: '#1b2028',
        borderLeft: '4px solid #f7931a',
        padding: 16,
        marginBottom: 24,
        flexDirection: 'column',
    },
    genesisLabel: {
        fontSize: 12,
        color: '#f7931a',
        fontWeight: 'bold',
        margin: '0 0 8px 0',
        letterSpacing: 1,
    },
    quote: {
        margin: 0,
        fontStyle: 'italic',
        color: '#ffffff',
        fontSize: 15,
    },
    section: {
        flexDirection: 'column',
        gap: 16,
    },
    paragraph: {
        lineHeight: 1.6,
        fontSize: 14,
        margin: 0,
    },
    highlight: {
        color: '#f7931a',
        fontWeight: 'bold',
    },
};

export default Home;
