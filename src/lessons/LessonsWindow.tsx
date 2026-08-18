import React, { useState } from 'react';
import Window from '../desktop/Window';
import { lessonsData } from '../config/lessons';
import type { Lesson, Phase } from '../config/lessons';
import { soundEffects } from '../utils/SoundEffects';
import renuralLogo from '../assets/pictures/renural-logo.png';

export interface LessonsWindowProps extends WindowAppProps {}

export const LessonsWindow: React.FC<LessonsWindowProps> = (props) => {
    const [activePhaseId, setActivePhaseId] = useState<string>('phase-1');
    const [selectedLessonId, setSelectedLessonId] = useState<string>('p1-l1');
    const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

    // Current phase
    const currentPhase = lessonsData.find(p => p.id === activePhaseId) || lessonsData[0];

    // Selected lesson
    let currentLesson: Lesson = currentPhase.lessons[0];
    for (const phase of lessonsData) {
        const found = phase.lessons.find(l => l.id === selectedLessonId);
        if (found) {
            currentLesson = found;
            break;
        }
    }

    const handlePhaseSelect = (phase: Phase) => {
        soundEffects.playSingleMouseClick();
        setActivePhaseId(phase.id);
        setSelectedLessonId(phase.lessons[0].id);
    };

    const handleLessonSelect = (lessonId: string) => {
        soundEffects.playSingleMouseClick();
        setSelectedLessonId(lessonId);
    };

    const toggleCompletion = (lessonId: string) => {
        soundEffects.playSingleMouseClick();
        setCompletedLessons(prev => ({
            ...prev,
            [lessonId]: !prev[lessonId]
        }));
    };

    return (
        <Window
            windowTitle="Lessons Explorer - Bitcoin Curriculum"
            width={820}
            height={490}
            top={20}
            left={40}
            closeWindow={props.onClose}
            minimizeWindow={props.onMinimize}
            onInteract={props.onInteract}
            windowBarIcon="computerBig"
        >
            <div style={styles.rootContainer}>
                {/* Top Phase Pills Header */}
                <div style={styles.headerContainer}>
                    {/* Phase Category Tabs */}
                    <div style={styles.phaseTabsRow}>
                        {lessonsData.map((phase) => {
                            const isActive = phase.id === activePhaseId;
                            return (
                                <button
                                    key={phase.id}
                                    onClick={() => handlePhaseSelect(phase)}
                                    style={{
                                        ...styles.phaseTabBtn,
                                        ...(isActive ? styles.phaseTabBtnActive : {}),
                                    }}
                                >
                                    {phase.shortTitle}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Body Layout */}
                <div style={styles.bodyLayout}>
                    {/* Left Lessons Sidebar */}
                    <div style={styles.sidebar}>
                        <div style={styles.sidebarHeader}>
                            <span style={styles.sidebarTitle}>{currentPhase.title}</span>
                            <span style={styles.sidebarBadge}>5 Lessons</span>
                        </div>
                        <div style={styles.lessonList}>
                            {currentPhase.lessons.map((lesson, idx) => {
                                const isSelected = lesson.id === selectedLessonId;
                                const isDone = completedLessons[lesson.id];
                                return (
                                    <div
                                        key={lesson.id}
                                        onClick={() => handleLessonSelect(lesson.id)}
                                        style={{
                                            ...styles.lessonListItem,
                                            ...(isSelected ? styles.lessonListItemSelected : {}),
                                        }}
                                    >
                                        <div style={styles.lessonItemIndex}>
                                            {isDone ? '✓' : `0${idx + 1}`}
                                        </div>
                                        <div style={styles.lessonItemText}>
                                            <div style={{
                                                ...styles.lessonItemTitle,
                                                color: isSelected ? '#111117' : 'rgba(17,17,23,0.85)',
                                            }}>
                                                {lesson.title}
                                            </div>
                                            <div style={styles.lessonItemMeta}>
                                                {lesson.readTime}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Learn more Renural Bottom Left Badge */}
                        <a
                            href="https://renural.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => soundEffects.playSingleMouseClick()}
                            style={styles.renuralFooterBadge}
                        >
                            <span style={styles.poweredText}>Learn more</span>
                            <img
                                src={renuralLogo}
                                alt="Renural"
                                style={styles.renuralLogoImg}
                            />
                            <span style={styles.renuralBrandText}>Renural ↗</span>
                        </a>
                    </div>

                    {/* Right Renural Card Viewport */}
                    <div style={styles.viewportPane}>
                        <div style={styles.renuralCardCanvas}>
                            {/* Card Header & Title */}
                            <div style={styles.cardHeaderArea}>
                                <div style={styles.cardTagsRow}>
                                    <span style={styles.tagsText}>{currentLesson.tags}</span>
                                </div>

                                <h1 style={styles.lessonTitleText}>{currentLesson.title}</h1>

                                <div style={styles.metaToolbar}>
                                    <div style={styles.ratingInfo}>
                                        <span style={styles.starIcon}>★</span>
                                        <span style={styles.ratingText}>5.0</span>
                                        <span style={styles.dotSeparator}>·</span>
                                        <span style={styles.readTimeText}>{currentLesson.readTime}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section: CORE INSIGHT */}
                            <div style={styles.sectionBlock}>
                                <div style={styles.sectionHeaderRow}>
                                    <span style={styles.sectionLabelText}>CORE INSIGHT</span>
                                    <div style={styles.sectionLineDivider} />
                                </div>

                                <div style={styles.coreInsightCard}>
                                    <div style={styles.coreInsightHighlightBar} />
                                    <p style={styles.coreInsightParagraph}>
                                        {currentLesson.coreInsight}
                                    </p>
                                </div>
                            </div>

                            {/* Section: DEEP DIVE */}
                            <div style={styles.sectionBlock}>
                                <div style={styles.sectionHeaderRow}>
                                    <span style={styles.sectionLabelText}>DEEP DIVE</span>
                                    <div style={styles.sectionLineDivider} />
                                </div>

                                <div style={styles.deepDiveContainer}>
                                    {currentLesson.deepDive.map((item) => (
                                        <div key={item.number} style={styles.deepDiveCard}>
                                            <div style={styles.deepDiveHeaderRow}>
                                                <span style={styles.deepDiveNumberText}>{item.number}</span>
                                                <span style={styles.deepDiveTitleText}>{item.title}</span>
                                                <span style={styles.deepDiveChevron}>›</span>
                                            </div>
                                            <p style={styles.deepDiveBodyText}>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Completion Toggle */}
                            <div style={styles.footerCompletionArea}>
                                <button
                                    onClick={() => toggleCompletion(currentLesson.id)}
                                    style={{
                                        ...styles.completeLessonBtn,
                                        ...(completedLessons[currentLesson.id] ? styles.completeLessonBtnDone : {}),
                                    }}
                                >
                                    {completedLessons[currentLesson.id] ? '✓ Lesson Completed' : 'Mark Lesson as Completed'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles = {
    rootContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#F4F2ED',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#111117',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    headerContainer: {
        padding: '10px 16px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(17,17,23,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flexShrink: 0,
    },
    brandingRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    curriculumTag: {
        fontSize: '10px',
        fontWeight: '800',
        color: 'rgba(17,17,23,0.4)',
        letterSpacing: '1.5px',
    },
    phaseTabsRow: {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
    },
    phaseTabBtn: {
        padding: '6px 14px',
        borderRadius: '20px',
        border: '1px solid rgba(17,17,23,0.12)',
        backgroundColor: '#FFFFFF',
        color: 'rgba(17,17,23,0.65)',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.8px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.15s ease',
    },
    phaseTabBtnActive: {
        backgroundColor: '#F59E0B',
        borderColor: '#D97706',
        color: '#FFFFFF',
        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
    },
    bodyLayout: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    sidebar: {
        width: '230px',
        backgroundColor: '#FAF9F5',
        borderRight: '1px solid rgba(17,17,23,0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    sidebarHeader: {
        padding: '12px 14px 8px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(17,17,23,0.05)',
        flexShrink: 0,
    },
    sidebarTitle: {
        fontSize: '11px',
        fontWeight: '800',
        color: 'rgba(17,17,23,0.45)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    sidebarBadge: {
        fontSize: '10px',
        color: '#D97706',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        padding: '2px 6px',
        borderRadius: '8px',
        fontWeight: '700',
    },
    lessonList: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        gap: '4px',
        overflowY: 'auto',
        flex: 1,
    },
    lessonListItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 10px',
        borderRadius: '10px',
        cursor: 'pointer',
        gap: '10px',
        transition: 'all 0.15s ease',
    },
    lessonListItemSelected: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 8px rgba(17,17,23,0.08)',
    },
    lessonItemIndex: {
        fontSize: '12px',
        fontWeight: '800',
        color: '#D97706',
        width: '18px',
    },
    lessonItemText: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        overflow: 'hidden',
    },
    lessonItemTitle: {
        fontSize: '12px',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    lessonItemMeta: {
        fontSize: '10px',
        color: 'rgba(17,17,23,0.4)',
    },
    renuralFooterBadge: {
        padding: '10px 12px',
        borderTop: '1px solid rgba(17,17,23,0.08)',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        flexShrink: 0,
        textDecoration: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    poweredText: {
        color: 'rgba(17,17,23,0.55)',
        fontWeight: '500',
        whiteSpace: 'nowrap',
    },
    renuralLogoImg: {
        width: '18px',
        height: '18px',
        objectFit: 'contain',
        marginLeft: '2px',
        marginRight: '0px',
    },
    renuralBrandText: {
        fontWeight: '800',
        color: '#111117',
        fontSize: '12.5px',
        letterSpacing: '0.3px',
        marginLeft: '1px',
        whiteSpace: 'nowrap',
    },
    viewportPane: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
    },
    renuralCardCanvas: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '540px',
        margin: '0 auto',
    },
    cardHeaderArea: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    cardTagsRow: {
        display: 'flex',
    },
    tagsText: {
        fontSize: '9.5px',
        fontWeight: '800',
        color: '#D97706',
        letterSpacing: '1.8px',
    },
    lessonTitleText: {
        fontSize: '24px',
        fontWeight: '800',
        margin: 0,
        color: '#111117',
        lineHeight: 1.2,
    },
    metaToolbar: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2px',
    },
    ratingInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '12px',
        color: 'rgba(17,17,23,0.6)',
    },
    starIcon: {
        color: '#F59E0B',
        fontSize: '14px',
    },
    ratingText: {
        fontWeight: '700',
        color: '#111117',
    },
    dotSeparator: {
        color: 'rgba(17,17,23,0.3)',
    },
    readTimeText: {
        fontSize: '11px',
    },
    sectionBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    sectionHeaderRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    sectionLabelText: {
        fontSize: '9.5px',
        fontWeight: '800',
        color: 'rgba(17,17,23,0.35)',
        letterSpacing: '2px',
    },
    sectionLineDivider: {
        flex: 1,
        height: '1px',
        backgroundColor: 'rgba(17,17,23,0.1)',
    },
    coreInsightCard: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '16px 18px 16px 22px',
        boxShadow: '0 4px 16px rgba(17,17,23,0.06)',
        overflow: 'hidden',
    },
    coreInsightHighlightBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '4px',
        backgroundColor: '#F59E0B',
    },
    coreInsightParagraph: {
        margin: 0,
        fontSize: '13.5px',
        lineHeight: 1.6,
        color: 'rgba(17,17,23,0.75)',
        fontWeight: '500',
    },
    deepDiveContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    deepDiveCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '12px 14px',
        boxShadow: '0 2px 10px rgba(17,17,23,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    deepDiveHeaderRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    deepDiveNumberText: {
        fontSize: '12px',
        fontWeight: '800',
        color: '#F59E0B',
    },
    deepDiveTitleText: {
        fontSize: '13px',
        fontWeight: '700',
        color: '#111117',
        flex: 1,
    },
    deepDiveChevron: {
        fontSize: '16px',
        color: 'rgba(17,17,23,0.3)',
        fontWeight: '400',
    },
    deepDiveBodyText: {
        margin: 0,
        fontSize: '12px',
        lineHeight: 1.5,
        color: 'rgba(17,17,23,0.6)',
    },
    footerCompletionArea: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '6px',
        paddingBottom: '12px',
    },
    completeLessonBtn: {
        padding: '10px 22px',
        borderRadius: '24px',
        border: 'none',
        backgroundColor: '#F59E0B',
        color: '#FFFFFF',
        fontSize: '12.5px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
        transition: 'all 0.15s ease',
    },
    completeLessonBtnDone: {
        backgroundColor: '#10B981',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
} as const;

export default LessonsWindow;
