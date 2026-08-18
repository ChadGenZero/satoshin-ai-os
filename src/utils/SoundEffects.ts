// Retro Sound Effects Manager
class SoundEffectsManager {
    private audioContext: AudioContext | null = null;
    private keyBuffers: AudioBuffer[] = [];
    private keyIndex: number = 0;
    private mouseDownBuffer: AudioBuffer | null = null;
    private mouseUpBuffer: AudioBuffer | null = null;
    private isMuted: boolean = false;
    private isInitialized: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const initEvents = ['click', 'keydown', 'mousedown', 'pointerdown'];
            const onFirstUserGesture = () => {
                this.init();
                initEvents.forEach((ev) => window.removeEventListener(ev, onFirstUserGesture));
            };
            initEvents.forEach((ev) => window.addEventListener(ev, onFirstUserGesture, { once: true }));

            // Global listener for typing sounds inside text inputs and chatbot
            window.addEventListener('keydown', (e: KeyboardEvent) => {
                const active = document.activeElement;
                const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || (active as HTMLElement).isContentEditable);
                if (isInput || (window as any).__isChatFocused) {
                    if (e.key && (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Space')) {
                        this.playNextKeyClick();
                    }
                }
            }, true);
        }
    }

    private getContext(): AudioContext {
        if (!this.audioContext) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            this.audioContext = new AudioCtx();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }
        return this.audioContext;
    }

    async init() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        try {
            const ctx = this.getContext();
            const keyPaths = [
                'assets/audio/keyboard/key_1.mp3',
                'assets/audio/keyboard/key_2.mp3',
                'assets/audio/keyboard/key_3.mp3',
                'assets/audio/keyboard/key_4.mp3',
                'assets/audio/keyboard/key_5.mp3',
                'assets/audio/keyboard/key_6.mp3',
            ];

            const fetchBuffer = async (path: string) => {
                const res = await fetch(path);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const arrayBuf = await res.arrayBuffer();
                return await ctx.decodeAudioData(arrayBuf);
            };

            // Preload 6 keyboard sounds in sequence
            const keyPromises = keyPaths.map((p) => fetchBuffer(p).catch(() => null));
            const buffers = await Promise.all(keyPromises);
            this.keyBuffers = buffers.filter((b): b is AudioBuffer => b !== null);

            // Preload mouse down and up buffers
            this.mouseDownBuffer = await fetchBuffer('assets/audio/mouse/mouse_down.mp3').catch(() => null);
            this.mouseUpBuffer = await fetchBuffer('assets/audio/mouse/mouse_up.mp3').catch(() => null);
            console.log('Successfully initialized SoundEffects manager!');
        } catch (e) {
            console.warn('SoundEffects initialization warning:', e);
        }
    }

    private playBuffer(buffer: AudioBuffer | null, volume: number = 0.5, playbackRate: number = 1.0) {
        if (this.isMuted || !buffer) return;
        try {
            const ctx = this.getContext();
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.playbackRate.value = playbackRate;

            const gain = ctx.createGain();
            gain.gain.value = volume;

            source.connect(gain);
            gain.connect(ctx.destination);

            source.start(0);
        } catch (e) {}
    }

    // Instant real-time mouse down audio
    playMouseDown() {
        this.playBuffer(this.mouseDownBuffer, 0.5);
    }

    // Instant real-time mouse up audio
    playMouseUp() {
        this.playBuffer(this.mouseUpBuffer, 0.5);
    }

    // Cycle sequentially through key_1..key_6 as user types
    playNextKeyClick() {
        if (this.keyBuffers.length === 0) {
            this.init();
            return;
        }
        const buffer = this.keyBuffers[this.keyIndex % this.keyBuffers.length];
        this.keyIndex = (this.keyIndex + 1) % this.keyBuffers.length;
        const pitch = 0.96 + Math.random() * 0.08;
        this.playBuffer(buffer, 0.45, pitch);
    }

    playKeyClick() {
        this.playNextKeyClick();
    }

    // Single down-up mouse click combo
    playSingleMouseClick() {
        this.playMouseDown();
        setTimeout(() => {
            this.playMouseUp();
        }, 45);
    }

    playMouseClick() {
        this.playSingleMouseClick();
    }

    playDoubleMouseClick() {
        this.playSingleMouseClick();
        setTimeout(() => {
            this.playSingleMouseClick();
        }, 110);
    }

    playWindowClose() {
        this.playSingleMouseClick();
    }

    setMuted(muted: boolean) {
        this.isMuted = muted;
    }
}

export const soundEffects = new SoundEffectsManager();
export default soundEffects;
