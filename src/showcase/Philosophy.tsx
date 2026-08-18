import React from 'react';

const QUOTES = [
    {
        quote: "The root problem with conventional currency is all the trust that's required to make it work. The central bank must be trusted not to debase the currency, but the history of fiat currencies is full of breaches of that trust.",
        context: "P2P Foundation forum post, Feb 2009",
    },
    {
        quote: "If you don't believe it or don't get it, I don't have the time to try to convince you, sorry.",
        context: "Bitcointalk post responding to scalability doubts, Jul 2010",
    },
    {
        quote: "It might make sense just to get some in case it catches on. If enough people think the same way, that becomes a self-fulfilling prophecy.",
        context: "Cryptography Mailing List, Jan 2009",
    },
];

const Philosophy: React.FC = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Satoshi's Quotes & Philosophy</h2>
            <div style={styles.quotesList}>
                {QUOTES.map((q, idx) => (
                    <div key={idx} style={styles.quoteCard}>
                        <p style={styles.quoteText}>"{q.quote}"</p>
                        <span style={styles.quoteContext}>— {q.context}</span>
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
    quotesList: {
        flexDirection: 'column',
        gap: 16,
    },
    quoteCard: {
        backgroundColor: '#1b2028',
        borderLeft: '4px solid #f7931a',
        padding: 16,
        flexDirection: 'column',
        gap: 8,
    },
    quoteText: {
        margin: 0,
        fontStyle: 'italic',
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 1.6,
    },
    quoteContext: {
        fontSize: 12,
        color: '#f7931a',
    },
};

export default Philosophy;
