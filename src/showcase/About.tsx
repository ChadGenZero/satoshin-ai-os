import React from 'react';

const About: React.FC = () => {
    return (
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <h2 style={styles.title}>About Satoshi Nakamoto</h2>
                <p style={styles.paragraph}>
                    Satoshi Nakamoto is the pseudonymous name used by the unknown creator(s) of Bitcoin. 
                    Beyond publishing the whitepaper and crafting the initial reference software (Bitcoin v0.1), 
                    Satoshi actively collaborated with early developers on public cryptography forums.
                </p>
                <p style={styles.paragraph}>
                    Satoshi remained involved in the project until late 2010 when control of the code repository 
                    and network alert key was handed over to Gavin Andresen and other community members.
                </p>
            </div>

            <div style={styles.sidebar}>
                <h4 style={styles.sidebarTitle}>KEY FACTS</h4>
                <div style={styles.factItem}>
                    <span style={styles.factLabel}>Active Period:</span>
                    <span style={styles.factValue}>2008 – 2011</span>
                </div>
                <div style={styles.factItem}>
                    <span style={styles.factLabel}>Estimated BTC:</span>
                    <span style={styles.factValue}>~1,100,000 BTC</span>
                </div>
                <div style={styles.factItem}>
                    <span style={styles.factLabel}>Known Media:</span>
                    <span style={styles.factValue}>Whitepaper, Forum Posts, Emails</span>
                </div>
                <div style={styles.factItem}>
                    <span style={styles.factLabel}>Identity:</span>
                    <span style={styles.factValue}>Unknown (100% Anonymous)</span>
                </div>
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
        flexDirection: 'row',
        gap: 24,
        overflowY: 'auto',
    },
    mainContent: {
        flex: 2,
        flexDirection: 'column',
        gap: 16,
    },
    title: {
        fontSize: 24,
        color: '#f7931a',
        margin: '0 0 8px 0',
    },
    paragraph: {
        lineHeight: 1.6,
        fontSize: 14,
        margin: 0,
    },
    sidebar: {
        flex: 1,
        backgroundColor: '#1b2028',
        padding: 16,
        borderRadius: 4,
        border: '1px solid #2d3748',
        flexDirection: 'column',
        gap: 12,
        height: 'fit-content',
    },
    sidebarTitle: {
        color: '#f7931a',
        margin: '0 0 8px 0',
        fontSize: 13,
        letterSpacing: 1,
    },
    factItem: {
        flexDirection: 'column',
        fontSize: 12,
        borderBottom: '1px solid #2d3748',
        paddingBottom: 6,
    },
    factLabel: {
        color: '#8899a6',
    },
    factValue: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 2,
    },
};

export default About;
