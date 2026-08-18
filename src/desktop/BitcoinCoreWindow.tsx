import React, { useState } from 'react';
import Window from './Window';

export interface BitcoinCoreWindowProps extends WindowAppProps {}

interface Transaction {
    id: string;
    date: string;
    type: 'mined' | 'sent' | 'received';
    label: string;
    address: string;
    amount: number;
    confirmations: number;
    txid: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
    {
        id: 'tx-1',
        date: '1/12/09 03:30',
        type: 'sent',
        label: 'Hal Finney',
        address: '1Q2TWHERaaL62VioUXMknMqqM4RR2aP7EE',
        amount: -10.0,
        confirmations: 98,
        txid: 'f4184ea8c8d529d769687f4e02d4c087c64128207611a95677e6ac4bb6dbf6c9',
    },
    {
        id: 'tx-2',
        date: '1/16/09 14:22',
        type: 'mined',
        label: 'Block 100 Reward',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        amount: 50.0,
        confirmations: 94,
        txid: '2b918f6c43c829e1205937bb1e582e5192c7365027581a95677e6ac4bb6dbf6a3',
    },
    {
        id: 'tx-3',
        date: '1/20/09 09:12',
        type: 'sent',
        label: 'Wei Dai',
        address: '1WeiDai88q2VioUXMknMqqM4RR2aP7EE',
        amount: -5.0,
        confirmations: 88,
        txid: '78a912bc43c829e1205937bb1e582e5192c7365027581a95677e6ac4bb6dbf6b8',
    },
    {
        id: 'tx-4',
        date: '1/03/09 18:15',
        type: 'mined',
        label: 'Genesis Block Subsidy',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        amount: 50.0,
        confirmations: 104,
        txid: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    },
];

const INITIAL_PEERS = [
    { ip: '136.1.2.3:8333', name: 'Hal Finney Node', ping: '32 ms', subver: '/Satoshi:0.1.0/' },
    { ip: '198.51.100.4:8333', name: 'Wei Dai Node', ping: '88 ms', subver: '/Satoshi:0.1.0/' },
    { ip: '203.0.113.88:8333', name: 'Nick Szabo Node', ping: '112 ms', subver: '/Satoshi:0.1.0/' },
    { ip: '192.0.2.14:8333', name: 'Dustin Trammell Node', ping: '65 ms', subver: '/Satoshi:0.1.0/' },
];

const BitcoinCoreWindow: React.FC<BitcoinCoreWindowProps> = (props) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'send' | 'receive' | 'transactions' | 'peers' | 'console'>('overview');
    const [balance, setBalance] = useState(1148.0);
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

    // Send Form State
    const [sendAddress, setSendAddress] = useState('');
    const [sendLabel, setSendLabel] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [sendNotification, setSendNotification] = useState<string | null>(null);

    // Receive State
    const [copied, setCopied] = useState(false);

    // Console State
    const [consoleInput, setConsoleInput] = useState('');
    const [consoleLogs, setConsoleLogs] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
        { type: 'output', text: 'Bitcoin Core RPC Console v0.1.0-beta' },
        { type: 'output', text: 'Type "help" for available node commands.' },
        { type: 'input', text: 'getblockcount' },
        { type: 'output', text: '104' },
    ]);

    const handleSendSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amt = parseFloat(sendAmount);
        if (!sendAddress.trim()) {
            setSendNotification('ERROR: Please enter a recipient Bitcoin address.');
            return;
        }
        if (isNaN(amt) || amt <= 0) {
            setSendNotification('ERROR: Please enter a valid positive amount.');
            return;
        }
        if (amt > balance) {
            setSendNotification('ERROR: Insufficient spendable balance.');
            return;
        }

        const now = new Date();
        const dateStr = (now.getMonth() + 1) + '/' + now.getDate() + '/' + (now.getFullYear() % 100) + ' ' +
            now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        const newTx: Transaction = {
            id: 'tx-' + Date.now(),
            date: dateStr,
            type: 'sent',
            label: sendLabel.trim() || 'Payment',
            address: sendAddress.trim(),
            amount: -amt,
            confirmations: 1,
            txid: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        };

        setBalance((prev) => prev - amt);
        setTransactions((prev) => [newTx, ...prev]);
        setSendAddress('');
        setSendLabel('');
        setSendAmount('');
        setSendNotification('SUCCESS: Broadcasted ' + amt.toFixed(8) + ' BTC.');
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConsoleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = consoleInput.trim();
        if (!cmd) return;

        const newLogs = [...consoleLogs, { type: 'input' as const, text: cmd }];
        const lower = cmd.toLowerCase();

        if (lower === 'help') {
            newLogs.push({
                type: 'output',
                text: 'Available RPC Commands:\n- getblockcount : Returns current block height\n- getbalance : Returns wallet spendable balance\n- getgenesisblock : Displays Genesis Block details & quote\n- getpeerinfo : Returns connected node statistics\n- sendtoaddress <address> <amount> : Broadcasts BTC\n- clear : Clears console window',
            });
        } else if (lower === 'getblockcount') {
            newLogs.push({ type: 'output', text: '104' });
        } else if (lower === 'getbalance') {
            newLogs.push({ type: 'output', text: balance.toFixed(8) + ' BTC' });
        } else if (lower === 'getgenesisblock') {
            newLogs.push({
                type: 'output',
                text: 'Block 0 Hash: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\nQuote: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"',
            });
        } else if (lower === 'getpeerinfo') {
            newLogs.push({ type: 'output', text: JSON.stringify(INITIAL_PEERS, null, 2) });
        } else if (lower === 'clear') {
            setConsoleLogs([]);
            setConsoleInput('');
            return;
        } else {
            newLogs.push({ type: 'output', text: 'Unknown command: "' + cmd + '". Type "help" for list of commands.' });
        }

        setConsoleLogs(newLogs);
        setConsoleInput('');
    };

    return (
        <Window
            top={24}
            left={48}
            width={760}
            height={500}
            windowTitle="Bitcoin Core – Wallet"
            windowBarIcon="bitcoinIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Bitcoin Core v0.1.0"
        >
            <div style={styles.appContainer}>
                {/* Menu Bar */}
                <div style={styles.menuBar}>
                    <span style={styles.menuItem}><u>F</u>ile</span>
                    <span style={styles.menuItem}><u>S</u>ettings</span>
                    <span style={styles.menuItem}><u>H</u>elp</span>
                </div>

                {/* Tab Navigation Bar */}
                <div style={styles.tabNav}>
                    <span style={styles.gripDots}>⋮</span>
                    <button
                        style={Object.assign({}, styles.tabButton, activeTab === 'overview' && styles.activeTabButton)}
                        onClick={() => setActiveTab('overview')}
                    >
                        <span style={styles.tabIcon}>🏠</span> Overview
                    </button>
                    <button
                        style={Object.assign({}, styles.tabButton, activeTab === 'send' && styles.activeTabButton)}
                        onClick={() => setActiveTab('send')}
                    >
                        <span style={{ ...styles.tabIcon, color: '#0055cc' }}>➡️</span> Send
                    </button>
                    <button
                        style={Object.assign({}, styles.tabButton, activeTab === 'receive' && styles.activeTabButton)}
                        onClick={() => setActiveTab('receive')}
                    >
                        <span style={{ ...styles.tabIcon, color: '#0055cc' }}>⬇️</span> Receive
                    </button>
                    <button
                        style={Object.assign({}, styles.tabButton, activeTab === 'transactions' && styles.activeTabButton)}
                        onClick={() => setActiveTab('transactions')}
                    >
                        <span style={styles.tabIcon}>📋</span> Transactions
                    </button>
                    <button
                        style={Object.assign({}, styles.tabButton, activeTab === 'peers' && styles.activeTabButton)}
                        onClick={() => setActiveTab('peers')}
                    >
                        <span style={styles.tabIcon}>🌐</span> Peers
                    </button>
                    <button
                        style={Object.assign({}, styles.tabButton, activeTab === 'console' && styles.activeTabButton)}
                        onClick={() => setActiveTab('console')}
                    >
                        <span style={styles.tabIcon}>💻</span> RPC Console
                    </button>
                </div>

                {/* Main Content Workspace */}
                <div style={styles.mainContent}>
                    {/* 1. OVERVIEW TAB - EXACT 1:1 MATCH TO REFERENCE IMAGE */}
                    {activeTab === 'overview' && (
                        <div style={styles.grid2Col}>
                            {/* Left Panel: Balances */}
                            <div style={styles.cardPanel}>
                                <h3 style={styles.cardHeader}>Balances</h3>

                                <div style={styles.balanceStack}>
                                    <div style={styles.balanceRow}>
                                        <span style={styles.label}>Available:</span>
                                        <span style={styles.amountText}>{balance.toFixed(8)} BTC</span>
                                    </div>
                                    <div style={styles.balanceRow}>
                                        <span style={styles.label}>Pending:</span>
                                        <span style={styles.amountText}>0.00000000 BTC</span>
                                    </div>

                                    <div style={styles.divider} />

                                    <div style={styles.balanceRow}>
                                        <span style={styles.label}>Total:</span>
                                        <span style={styles.amountText}>{balance.toFixed(8)} BTC</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: Recent Transactions */}
                            <div style={styles.cardPanel}>
                                <h3 style={styles.cardHeader}>Recent transactions</h3>

                                <div style={styles.txListStack}>
                                    {transactions.slice(0, 3).map((tx) => (
                                        <div key={tx.id} style={styles.txRowItem}>
                                            {/* Directional Arrow Icon Frame */}
                                            <div style={styles.arrowIconFrame}>
                                                <div style={{
                                                    ...styles.arrowCircle,
                                                    borderColor: tx.amount < 0 ? '#b83b3b' : '#666666'
                                                }}>
                                                    <span style={{
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        color: tx.amount < 0 ? '#d90000' : '#444444'
                                                    }}>
                                                        {tx.amount < 0 ? '➔' : '⬅'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Transaction Meta (Date + Name) */}
                                            <div style={styles.txMetaStack}>
                                                <div style={styles.txDateText}>{tx.date}</div>
                                                <div style={styles.txLabelText}>{tx.label}</div>
                                            </div>

                                            {/* Transaction Amount */}
                                            <div style={{
                                                ...styles.txAmountText,
                                                color: tx.amount < 0 ? '#d90000' : '#000000'
                                            }}>
                                                {tx.amount < 0 ? tx.amount.toFixed(8) : '+' + tx.amount.toFixed(8)} BTC
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. SEND TAB */}
                    {activeTab === 'send' && (
                        <div style={styles.cardPanelFull}>
                            <h3 style={styles.cardHeader}>Send Bitcoins</h3>
                            <form onSubmit={handleSendSubmit} style={styles.formStack}>
                                <div style={styles.formGroup}>
                                    <label style={styles.inputLabel}>Pay To:</label>
                                    <input
                                        type="text"
                                        style={styles.inputField}
                                        placeholder="1HalFinneyaaL62VioUXMknMqqM4RR2aP7EE"
                                        value={sendAddress}
                                        onChange={(e) => setSendAddress(e.target.value)}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.inputLabel}>Label:</label>
                                    <input
                                        type="text"
                                        style={styles.inputField}
                                        placeholder="Payment note"
                                        value={sendLabel}
                                        onChange={(e) => setSendLabel(e.target.value)}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.inputLabel}>Amount (BTC):</label>
                                    <input
                                        type="number"
                                        step="0.00000001"
                                        style={styles.inputField}
                                        placeholder="0.00000000"
                                        value={sendAmount}
                                        onChange={(e) => setSendAmount(e.target.value)}
                                    />
                                </div>

                                {sendNotification && (
                                    <div style={{
                                        padding: '8px 12px',
                                        fontSize: 12,
                                        backgroundColor: sendNotification.startsWith('ERROR') ? '#ffe6e6' : '#e6ffe6',
                                        color: sendNotification.startsWith('ERROR') ? '#990000' : '#006600',
                                        border: '1px solid ' + (sendNotification.startsWith('ERROR') ? '#ff9999' : '#99cc99'),
                                        borderRadius: 2,
                                    }}>
                                        {sendNotification}
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                                    <button type="submit" style={styles.retroButton}>
                                        Send Bitcoin
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 3. RECEIVE TAB */}
                    {activeTab === 'receive' && (
                        <div style={styles.grid2Col}>
                            <div style={styles.cardPanel}>
                                <h3 style={styles.cardHeader}>Receiving Address</h3>
                                <p style={{ fontSize: 12, color: '#444', marginBottom: 12 }}>
                                    Your Bitcoin address for receiving payments:
                                </p>
                                <div style={styles.addressDisplayBox}>
                                    1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                                </div>
                                <button onClick={handleCopyAddress} style={{ ...styles.retroButton, marginTop: 16 }}>
                                    {copied ? '✓ Copied to Clipboard!' : 'Copy Address'}
                                </button>
                            </div>

                            <div style={{ ...styles.cardPanel, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ backgroundColor: '#ffffff', padding: 12, border: '1px solid #b0b0b0' }}>
                                    <div style={{ fontSize: 18, fontFamily: 'monospace', lineHeight: 1, letterSpacing: 2 }}>
                                        █████ █ █ █████<br />
                                        █   █ █ █ █   █<br />
                                        █ █ █ █ █ █ █ █<br />
                                        █████ █ █ █████
                                    </div>
                                </div>
                                <span style={{ fontSize: 11, color: '#666', marginTop: 10 }}>Genesis Address QR</span>
                            </div>
                        </div>
                    )}

                    {/* 4. TRANSACTIONS TAB */}
                    {activeTab === 'transactions' && (
                        <div style={styles.cardPanelFull}>
                            <h3 style={styles.cardHeader}>Transaction History</h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Date</th>
                                        <th style={styles.th}>Label</th>
                                        <th style={styles.th}>Amount</th>
                                        <th style={styles.th}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} style={styles.tr}>
                                            <td style={styles.td}>{tx.date}</td>
                                            <td style={styles.td}>{tx.label}</td>
                                            <td style={{ ...styles.td, fontWeight: 'bold', color: tx.amount < 0 ? '#d90000' : '#000000' }}>
                                                {tx.amount < 0 ? tx.amount.toFixed(8) : '+' + tx.amount.toFixed(8)} BTC
                                            </td>
                                            <td style={styles.td}>✓ {tx.confirmations} Confs</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 5. PEERS TAB */}
                    {activeTab === 'peers' && (
                        <div style={styles.cardPanelFull}>
                            <h3 style={styles.cardHeader}>Connected P2P Nodes</h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>IP Address</th>
                                        <th style={styles.th}>Identity</th>
                                        <th style={styles.th}>Subversion</th>
                                        <th style={styles.th}>Ping</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {INITIAL_PEERS.map((p, idx) => (
                                        <tr key={idx} style={styles.tr}>
                                            <td style={{ ...styles.td, fontFamily: 'monospace' }}>{p.ip}</td>
                                            <td style={{ ...styles.td, fontWeight: 'bold' }}>{p.name}</td>
                                            <td style={styles.td}>{p.subver}</td>
                                            <td style={{ ...styles.td, color: '#008800' }}>{p.ping}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 6. RPC CONSOLE TAB */}
                    {activeTab === 'console' && (
                        <div style={{ ...styles.cardPanelFull, flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
                            <h3 style={styles.cardHeader}>Bitcoin Core RPC Console</h3>
                            <div style={styles.consoleBox}>
                                {consoleLogs.map((log, i) => (
                                    <div key={i} style={{ marginBottom: 4 }}>
                                        {log.type === 'input' ? (
                                            <div style={{ color: '#0055cc', fontWeight: 'bold' }}>&gt; {log.text}</div>
                                        ) : (
                                            <div style={{ color: '#333333', whiteSpace: 'pre-wrap', paddingLeft: 8 }}>{log.text}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleConsoleSubmit} style={{ display: 'flex', marginTop: 8 }}>
                                <span style={{ fontFamily: 'monospace', fontSize: 12, padding: '4px 6px' }}>&gt;</span>
                                <input
                                    type="text"
                                    style={styles.consoleInputField}
                                    placeholder="Type 'help'..."
                                    value={consoleInput}
                                    onChange={(e) => setConsoleInput(e.target.value)}
                                />
                            </form>
                        </div>
                    )}
                </div>

                {/* Bottom Status Bar - Clean Right Corner Alignment */}
                <div style={styles.statusBar}>
                    <div style={styles.statusIconsRight}>
                        <span style={{ fontSize: 11, fontWeight: 'bold', color: '#333' }}>BTC</span>
                        <span style={{ fontSize: 12, color: '#e69500' }}>📶</span>
                        <span style={{ fontSize: 14, color: '#00aa00', fontWeight: 'bold' }}>✓</span>
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#ececec',
        color: '#000000',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    menuBar: {
        display: 'flex',
        gap: 16,
        padding: '4px 12px',
        backgroundColor: '#ececec',
        borderBottom: '1px solid #d4d4d4',
        fontSize: 12,
        color: '#111111',
    },
    menuItem: {
        cursor: 'pointer',
    },
    tabNav: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '6px 8px 0 8px',
        backgroundColor: '#e2e2e2',
        borderBottom: '1px solid #c0c0c0',
    },
    gripDots: {
        color: '#888888',
        marginRight: 4,
        fontSize: 14,
    },
    tabButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ececec',
        border: '1px solid #c0c0c0',
        borderBottom: 'none',
        borderRadius: '3px 3px 0 0',
        padding: '6px 14px',
        fontSize: 12,
        color: '#333333',
        cursor: 'pointer',
        outline: 'none',
    },
    activeTabButton: {
        backgroundColor: '#f5f5f5',
        color: '#000000',
        fontWeight: 'bold',
        borderBottom: '1px solid #f5f5f5',
        marginBottom: -1,
    },
    tabIcon: {
        marginRight: 6,
        fontSize: 13,
    },
    mainContent: {
        flex: 1,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        boxSizing: 'border-box',
    },
    grid2Col: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        height: '100%',
    },
    cardPanel: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f8f8',
        border: '1px solid #c0c0c0',
        borderRadius: 2,
        padding: 16,
        boxSizing: 'border-box',
    },
    cardPanelFull: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f8f8',
        border: '1px solid #c0c0c0',
        borderRadius: 2,
        padding: 16,
        boxSizing: 'border-box',
        height: '100%',
    },
    cardHeader: {
        margin: '0 0 16px 0',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111111',
    },
    balanceStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    balanceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#333333',
    },
    amountText: {
        fontFamily: 'Segoe UI, Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000000',
    },
    divider: {
        borderBottom: '1px solid #d0d0d0',
        margin: '6px 0',
    },
    txListStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
    },
    txRowItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    arrowIconFrame: {
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        border: '2px solid #888888',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eaeaea',
    },
    txMetaStack: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    txDateText: {
        fontSize: 11,
        color: '#555555',
    },
    txLabelText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111111',
    },
    txAmountText: {
        fontFamily: 'Segoe UI, Arial, sans-serif',
        fontSize: 12,
        fontWeight: 'bold',
    },
    formStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    inputLabel: {
        fontSize: 11,
        color: '#333',
    },
    inputField: {
        width: '100%',
        padding: '6px 10px',
        fontSize: 12,
        backgroundColor: '#ffffff',
        border: '1px solid #7f9db9',
        borderRadius: 2,
        boxSizing: 'border-box',
        outline: 'none',
    },
    retroButton: {
        backgroundColor: '#e1e1e1',
        border: '1px solid #707070',
        borderRadius: 2,
        padding: '6px 16px',
        fontSize: 12,
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    addressDisplayBox: {
        backgroundColor: '#ffffff',
        border: '1px solid #7f9db9',
        padding: '8px 12px',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 12,
    },
    th: {
        textAlign: 'left',
        padding: '6px 8px',
        backgroundColor: '#e8e8e8',
        borderBottom: '1px solid #b0b0b0',
        fontWeight: 'bold',
    },
    td: {
        padding: '6px 8px',
        borderBottom: '1px solid #e0e0e0',
    },
    tr: {
        backgroundColor: '#ffffff',
    },
    consoleBox: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        border: '1px solid #7f9db9',
        padding: 10,
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: 11,
        overflowY: 'auto',
        maxHeight: 240,
    },
    consoleInputField: {
        flex: 1,
        padding: '6px 8px',
        fontSize: 11,
        fontFamily: 'Consolas, Monaco, monospace',
        border: '1px solid #7f9db9',
        outline: 'none',
    },
    statusBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '4px 12px',
        backgroundColor: '#ececec',
        borderTop: '1px solid #d4d4d4',
    },
    statusIconsRight: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
};

export default BitcoinCoreWindow;
