import React from 'react';

const EVENTS = [
    { year: '2007', title: 'Code Development', desc: 'Satoshi begins writing the initial Bitcoin code implementation.' },
    { year: 'Aug 2008', title: 'Domain Registration', desc: 'bitcoin.org domain is registered anonymously.' },
    { year: 'Oct 31, 2008', title: 'Whitepaper Published', desc: 'Satoshi releases the Bitcoin whitepaper to the Cryptography Mailing List.' },
    { year: 'Jan 3, 2009', title: 'Genesis Block Mined', desc: 'Block 0 is mined with 50 BTC reward and embedded newspaper headline.' },
    { year: 'Jan 9, 2009', title: 'Bitcoin v0.1 Released', desc: 'First open-source software release on SourceForge.' },
    { year: 'Jan 12, 2009', title: 'First Transaction', desc: 'Satoshi sends 10 BTC to cypherpunk pioneer Hal Finney.' },
    { year: 'Dec 12, 2010', title: 'Final Forum Post', desc: 'Satoshi makes last public post on Bitcointalk regarding DoS limits.' },
    { year: 'Apr 26, 2011', title: 'Final Email', desc: `Satoshi emails Mike Hearn: "I've moved on to other things."` },
];

const Timeline: React.FC = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Historical Timeline</h2>
            <div style={styles.timeline}>
                {EVENTS.map((ev, idx) => (
                    <div key={idx} style={styles.item}>
                        <div style={styles.dateBadge}>{ev.year}</div>
                        <div style={styles.content}>
                            <h4 style={styles.eventTitle}>{ev.title}</h4>
                            <p style={styles.eventDesc}>{ev.desc}</p>
                        </div>
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
    timeline: {
        flexDirection: 'column',
        gap: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        backgroundColor: '#1b2028',
        padding: 12,
        borderRadius: 4,
        borderLeft: '3px solid #f7931a',
    },
    dateBadge: {
        minWidth: 100,
        color: '#f7931a',
        fontWeight: 'bold',
        fontSize: 13,
    },
    content: {
        flexDirection: 'column',
        gap: 4,
    },
    eventTitle: {
        margin: 0,
        color: '#ffffff',
        fontSize: 14,
    },
    eventDesc: {
        margin: 0,
        color: '#a0aec0',
        fontSize: 12,
    },
};

export default Timeline;
