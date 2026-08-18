export interface DeepDiveItem {
    number: string;
    title: string;
    description: string;
}

export interface Lesson {
    id: string;
    title: string;
    tags: string;
    rating: string;
    readTime: string;
    coreInsight: string;
    deepDive: DeepDiveItem[];
}

export interface Phase {
    id: string;
    title: string;
    shortTitle: string;
    lessons: Lesson[];
}

export const lessonsData: Phase[] = [
    {
        id: 'phase-1',
        title: 'Phase 1 - Understanding Money',
        shortTitle: 'MONEY THEORY',
        lessons: [
            {
                id: 'p1-l1',
                title: 'What is money?',
                tags: 'MONEY THEORY · VALUE · MEDIUM OF EXCHANGE',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Money is a technology for communicating value across time and space. It eliminates the coincidence of wants in barter systems by serving as a medium of exchange, unit of account, and store of value.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Medium of Exchange',
                        description: 'Eliminates the friction of barter economies, allowing individuals to exchange specialized labor for a universally accepted token.'
                    },
                    {
                        number: '02',
                        title: 'Store of Value',
                        description: 'Preserves purchasing power into the future so your spent energy and labor are not degraded over time.'
                    },
                    {
                        number: '03',
                        title: 'Unit of Account',
                        description: 'Provides a common numerical metric for pricing goods, calculating profits, and facilitating rational economic calculation.'
                    }
                ]
            },
            {
                id: 'p1-l2',
                title: 'Why gold?',
                tags: 'COMMODITIES · HARD MONEY · SCARCITY',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Gold emerged naturally as primordial money over 5,000 years because of its unforgeable costliness, physical durability, divisibility, and high stock-to-flow ratio.',
                deepDive: [
                    {
                        number: '01',
                        title: 'High Stock-to-Flow Ratio',
                        description: 'Existing gold stock is vast compared to new annual mined flow (~1.5% inflation), making supply manipulation impossible.'
                    },
                    {
                        number: '02',
                        title: 'Physical Durability',
                        description: 'Gold does not tarnish, corrode, or decay, preserving physical integrity across millennia.'
                    },
                    {
                        number: '03',
                        title: 'Divisibility & Meltability',
                        description: 'Can be melted down and divided into uniform coins and bars without losing underlying value.'
                    }
                ]
            },
            {
                id: 'p1-l3',
                title: 'Why fiat?',
                tags: 'FIAT CURRENCY · CENTRAL BANKING · RISK',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Fiat currency is government-issued paper or digital debt declared legal tender without physical commodity backing, relying entirely on state decree and taxation enforcement.',
                deepDive: [
                    {
                        number: '01',
                        title: 'The Gold Standard Abandonment',
                        description: 'In 1971, the link between the US dollar and gold was severed, unanchoring global money from physical scarcity.'
                    },
                    {
                        number: '02',
                        title: 'Unlimited Currency Creation',
                        description: 'Central banks can create fiat currency units infinitely with zero physical mining or production effort.'
                    },
                    {
                        number: '03',
                        title: 'Counterparty Risk',
                        description: 'Fiat purchasing power depends entirely on government fiscal discipline and geopolitical stability.'
                    }
                ]
            },
            {
                id: 'p1-l4',
                title: 'Inflation.',
                tags: 'MACROECONOMICS · PURCHASING POWER · CANTILLON',
                rating: '5.0',
                readTime: '3 min read',
                coreInsight: 'Inflation is the expansion of the money supply, which stealthily dilutes purchasing power and transfers wealth from cash savers to early currency recipients and debt issuers.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Money Supply Expansion',
                        description: 'When central banks print new currency units, each existing unit claims a smaller share of available goods.'
                    },
                    {
                        number: '02',
                        title: 'The Cantillon Effect',
                        description: 'Those closest to the money printer (banks, institutions) spend new money before prices rise at the expense of late recipients.'
                    },
                    {
                        number: '03',
                        title: 'The Savers Penalty',
                        description: 'Holding fiat cash in traditional bank accounts guarantees annual purchasing power decay.'
                    }
                ]
            },
            {
                id: 'p1-l5',
                title: 'Central banking.',
                tags: 'FINANCIAL SYSTEM · MORAL HAZARD · INTEREST RATES',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Central banks exercise monopoly control over interest rates and money creation, creating artificial economic boom-and-bust cycles and systemic moral hazard.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Interest Rate Manipulation',
                        description: 'Setting artificial price tags on capital distorts market signals and leads to widespread resource misallocation.'
                    },
                    {
                        number: '02',
                        title: 'Quantitative Easing',
                        description: 'Central banks purchase sovereign and corporate debt directly to artificially expand commercial bank liquidity.'
                    },
                    {
                        number: '03',
                        title: 'Bailouts & Moral Hazard',
                        description: 'Rescuing insolvent financial institutions encourages reckless risk-taking by privatizing gains and socializing losses.'
                    }
                ]
            }
        ]
    },
    {
        id: 'phase-2',
        title: 'Phase 2 - Why Bitcoin Exists',
        shortTitle: 'WHY BITCOIN EXISTS',
        lessons: [
            {
                id: 'p2-l1',
                title: 'The 2008 financial crisis.',
                tags: 'HISTORY · 2008 CRISIS · GENESIS',
                rating: '5.0',
                readTime: '3 min read',
                coreInsight: 'The collapse of subprime mortgage derivatives exposed global financial fragility, triggering massive bailouts and inspiring Satoshi Nakamoto to launch Bitcoin.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Systemic Banking Collapse',
                        description: 'Over-leveraged Wall Street institutions brought global credit markets to the brink of complete shutdown.'
                    },
                    {
                        number: '02',
                        title: 'Trillion-Dollar Printing',
                        description: 'Governments created currency on unprecedented scales to rescue insolvent banking conglomerates.'
                    },
                    {
                        number: '03',
                        title: 'The Genesis Catalyst',
                        description: 'Satoshi embedded The Times 03/Jan/2009 headline into Block 0 as a permanent monetary protest.'
                    }
                ]
            },
            {
                id: 'p2-l2',
                title: 'Double spending.',
                tags: 'COMPUTER SCIENCE · CONSENSUS · PROTOCOL',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'In digital environments, data can be copied infinitely. Satoshi solved the double-spending problem without central authorities using a decentralized cryptographic time-chain.',
                deepDive: [
                    {
                        number: '01',
                        title: 'The Digital Copy Problem',
                        description: 'Unlike physical coins, raw digital data files can be duplicated perfectly without cost.'
                    },
                    {
                        number: '02',
                        title: 'The Centralized Solution',
                        description: 'Banks prevented double-spending by acting as centralized gatekeepers of private internal ledgers.'
                    },
                    {
                        number: '03',
                        title: 'Peer-to-Peer Consensus',
                        description: 'Bitcoin established mathematical consensus across independent nodes without trusting any single entity.'
                    }
                ]
            },
            {
                id: 'p2-l3',
                title: 'Digital scarcity.',
                tags: 'BITCOIN PROTOCOL · 21 MILLION · HARD CAP',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Bitcoin introduced absolute digital scarcity to human civilization—an immutable supply cap of exactly 21,000,000 bitcoins enforced by global consensus.',
                deepDive: [
                    {
                        number: '01',
                        title: 'The 21 Million Limit',
                        description: 'No politician, bank, or programmer can ever increase the hard-coded supply limit.'
                    },
                    {
                        number: '02',
                        title: 'The Halving Mechanism',
                        description: 'Issuance is cut in half every 210,000 blocks (~4 years), compounding scarcity over time.'
                    },
                    {
                        number: '03',
                        title: 'Full Node Enforcement',
                        description: 'Thousands of independent user nodes instantly reject any block that violates supply rules.'
                    }
                ]
            },
            {
                id: 'p2-l4',
                title: 'The Genesis Block.',
                tags: 'BLOCKCHAIN · BLOCK 0 · TIMESTAMP',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Mined on January 3, 2009, Block 0 established the immutable origin of the Bitcoin blockchain with zero pre-mine or privileged founder allocation.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Block 0 Timestamp',
                        description: 'Mined at 18:15:05 GMT, releasing the initial 50 BTC coinbase reward.'
                    },
                    {
                        number: '02',
                        title: 'Proof of Launch',
                        description: 'The embedded newspaper headline proved no coins were mined prior to public announcement.'
                    },
                    {
                        number: '03',
                        title: 'Fair Distribution',
                        description: 'Satoshi gave the world open-source code, allowing anyone to participate equally.'
                    }
                ]
            },
            {
                id: 'p2-l5',
                title: 'Proof of Work.',
                tags: 'MINING · ENERGY · THERMODYNAMICS',
                rating: '5.0',
                readTime: '3 min read',
                coreInsight: 'Proof of Work anchors digital transactions to real-world physical energy, making historical ledger modification computationally and thermodynamically impossible.',
                deepDive: [
                    {
                        number: '01',
                        title: 'SHA-256 Mining',
                        description: 'Miners expend electrical power executing billions of cryptographic hashes to secure candidate blocks.'
                    },
                    {
                        number: '02',
                        title: 'Difficulty Adjustment',
                        description: 'Automatically recalibrates every 2,016 blocks (~2 weeks) to maintain steady 10-minute block times.'
                    },
                    {
                        number: '03',
                        title: 'Unalterable History',
                        description: 'Rewriting past transactions requires expending more energy than the rest of the global network combined.'
                    }
                ]
            }
        ]
    },
    {
        id: 'phase-3',
        title: 'Phase 3 - Becoming a Bitcoiner',
        shortTitle: 'BECOMING A BITCOINER',
        lessons: [
            {
                id: 'p3-l1',
                title: 'Wallets.',
                tags: 'SECURITY · KEYS · SOFTWARE & HARDWARE',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Bitcoin wallets do not hold coins—they store public and private cryptographic keys used to sign transactions on the global blockchain.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Public Keys & Addresses',
                        description: 'Shareable destination addresses used to receive funds securely.'
                    },
                    {
                        number: '02',
                        title: 'Private Keys',
                        description: 'Secret digital signatures required to authorize and broadcast spending transactions.'
                    },
                    {
                        number: '03',
                        title: 'Hot vs Cold Storage',
                        description: 'Internet-connected mobile apps vs air-gapped hardware security devices.'
                    }
                ]
            },
            {
                id: 'p3-l2',
                title: 'Seed phrases.',
                tags: 'BIP-39 · BACKUP · RECOVERY',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'A seed phrase (BIP-39) is a human-readable list of 12 or 24 words that deterministically generates all private keys and addresses in your wallet.',
                deepDive: [
                    {
                        number: '01',
                        title: 'BIP-39 Standard',
                        description: 'Mathematical key derivation mapped to a standardized dictionary of 2,048 English words.'
                    },
                    {
                        number: '02',
                        title: 'Universal Wallet Backup',
                        description: 'Allows complete balance restoration on any hardware or software wallet anywhere on Earth.'
                    },
                    {
                        number: '03',
                        title: 'Physical Storage',
                        description: 'Must be engraved in steel or written on heavy paper—never stored digitally or photographed.'
                    }
                ]
            },
            {
                id: 'p3-l3',
                title: 'Self-custody.',
                tags: 'SOVEREIGNTY · NOT YOUR KEYS · FREEDOM',
                rating: '5.0',
                readTime: '3 min read',
                coreInsight: '"Not your keys, not your coins." Self-custody eliminates exchange risk and grants sovereign ownership over your personal wealth.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Eliminating Exchange Risk',
                        description: 'Prevents loss from centralized exchange bankruptcies, hacks, or frozen accounts.'
                    },
                    {
                        number: '02',
                        title: 'Sovereign Financial Freedom',
                        description: 'Ensures no third party can freeze, confiscate, or censor your legal transactions.'
                    },
                    {
                        number: '03',
                        title: 'Hardware Security',
                        description: 'Utilizing specialized hardware wallets to sign transactions offline safely.'
                    }
                ]
            },
            {
                id: 'p3-l4',
                title: 'Buying Bitcoin safely.',
                tags: 'DCA · EXCHANGES · BEST PRACTICES',
                rating: '5.0',
                readTime: '2 min read',
                coreInsight: 'Acquiring Bitcoin safely involves choosing reputable platforms, adopting regular accumulation strategies, and withdrawing immediately to self-custody.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Dollar-Cost Averaging (DCA)',
                        description: 'Accumulating fixed fiat amounts regularly to smooth out market volatility.'
                    },
                    {
                        number: '02',
                        title: 'Immediate Withdrawal',
                        description: 'Transferring coins off exchanges directly into your personal hardware wallet.'
                    },
                    {
                        number: '03',
                        title: 'Peer-to-Peer Options',
                        description: 'Exploring non-custodial and peer-to-peer exchanges for enhanced privacy.'
                    }
                ]
            },
            {
                id: 'p3-l5',
                title: 'Avoiding scams.',
                tags: 'SECURITY · HYGIENE · VIGILANCE',
                rating: '5.0',
                readTime: '3 min read',
                coreInsight: 'While Bitcoin cryptographic security is unbreakable, scammers target human psychology through phishing, fake yield promises, and social engineering.',
                deepDive: [
                    {
                        number: '01',
                        title: 'Never Share Seed Phrases',
                        description: 'No legitimate service, support desk, or app will ever ask for your 12 or 24 words.'
                    },
                    {
                        number: '02',
                        title: 'Beware Yield Promises',
                        description: 'High guaranteed returns or "double your bitcoin" promotions are 100% fraudulent.'
                    },
                    {
                        number: '03',
                        title: 'Verify Official Sources',
                        description: 'Always download wallet software from official websites and verify digital GPG signatures.'
                    }
                ]
            }
        ]
    }
];
