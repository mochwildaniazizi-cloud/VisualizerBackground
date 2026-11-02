import { useState, useRef } from 'react';
import { HeroVisualizer } from './components/HeroVisualizer';
import { OpeningIntro } from './components/OpeningIntro';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import {
    RotateCcw,
    Waves,
    Sliders,
    Maximize2,
    Minimize2,
    Sparkles,
    Hand,
    Type,
    MousePointer
} from 'lucide-react';

export default function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [introKey, setIntroKey] = useState(0);
    const [cursorColor, setCursorColor] = useState('#FF3B30');
    const [columnCount, setColumnCount] = useState(24);
    const [idleWave, setIdleWave] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [demoText, setDemoText] = useState('Type something to test text cursor...');
    const [activeTab, setActiveTab] = useState<'overview' | 'playground'>('overview');

    const handleReplayIntro = () => {
        setIntroKey((prev: number) => prev + 1);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => { });
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => { });
        }
    };

    const colorOptions = [
        { name: 'Crimson Red', hex: '#FF3B30' },
        { name: 'Neon Rose', hex: '#F43F5E' },
        { name: 'Blood Orange', hex: '#FF4500' },
        { name: 'Ruby Dark', hex: '#C01111' },
    ];

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen w-full bg-black text-white font-sans overflow-hidden select-none"
        >
            {/* 1. Custom Red Cursor with Echo Trail */}
            <CustomCursor color={cursorColor} />

            {/* 2. Opening Shutter Intro (remountable on key change) */}
            <OpeningIntro key={introKey} />

            {/* 3. Interactive Hero Visualizer Background */}
            <HeroVisualizer
                containerRef={containerRef}
                columnCount={columnCount}
                idleWave={idleWave}
            />

            {/* 4. Top Header & GitHub Link */}
            <header className="relative z-30 flex items-center justify-end px-6 py-6 sm:px-10">

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReplayIntro}
                        className="group flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:border-[#FF3B30]/50 hover:bg-neutral-900 hover:text-white"
                        title="Replay opening intro animation"
                    >
                        <RotateCcw className="h-3.5 w-3.5 text-[#FF3B30] transition-transform duration-500 group-hover:-rotate-180" />
                        <span>Replay Intro</span>
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="hidden sm:flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md p-2 text-xs text-neutral-300 transition-all hover:border-neutral-700 hover:text-white"
                        title="Toggle Fullscreen"
                    >
                        {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                    </button>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md px-3.5 py-1.5 text-xs text-neutral-300 transition-all hover:border-neutral-700 hover:text-white"
                    >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span className="hidden md:inline">GitHub</span>
                    </a>
                </div>
            </header>

            {/* 5. Center Stage Hero Showcase */}
            <main className="relative z-20 flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 text-center">

                {/* Big Display Title */}
                <h1 className="font-display text-5xl font-extrabold tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
                    <span className="inline-block bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-sm">
                        VISUALIZER
                    </span>
                </h1>

                {/* Mode Selector Pill */}
                <div className="mt-8 flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/70 p-1.5 backdrop-blur-md">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${activeTab === 'overview'
                            ? 'bg-[#FF3B30] text-white shadow-[0_0_15px_rgba(255,59,48,0.4)]'
                            : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Cursor States Demo
                    </button>
                    <button
                        onClick={() => setActiveTab('playground')}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${activeTab === 'playground'
                            ? 'bg-[#FF3B30] text-white shadow-[0_0_15px_rgba(255,59,48,0.4)]'
                            : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Visualizer Controls
                    </button>
                </div>

                {/* Tab 1: Interactive Cursor States Testing Area */}
                {activeTab === 'overview' && (
                    <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                        {/* Pointer Demo */}
                        <div className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-800/80 bg-neutral-950/50 p-5 backdrop-blur-md transition-all hover:border-[#FF3B30]/40 hover:bg-neutral-900/60">
                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-neutral-400 group-hover:text-[#FF3B30]">
                                <MousePointer className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-semibold text-neutral-200">Pointer State</span>
                            <span className="mt-1 text-[11px] text-neutral-500">Hover tombol & link</span>
                            <button className="mt-3 rounded-lg bg-neutral-800/80 px-3 py-1 text-[11px] font-medium text-neutral-300 transition hover:bg-[#FF3B30] hover:text-white">
                                Hover Me
                            </button>
                        </div>

                        {/* Text Demo */}
                        <div className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-800/80 bg-neutral-950/50 p-5 backdrop-blur-md transition-all hover:border-[#FF3B30]/40 hover:bg-neutral-900/60">
                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-neutral-400 group-hover:text-[#FF3B30]">
                                <Type className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-semibold text-neutral-200">Text I-Beam State</span>
                            <span className="mt-1 text-[11px] text-neutral-500">Hover & edit input</span>
                            <input
                                type="text"
                                value={demoText}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemoText(e.target.value)}
                                className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-center text-[11px] text-neutral-200 focus:border-[#FF3B30] focus:outline-none"
                            />
                        </div>

                        {/* Grab Demo */}
                        <div
                            draggable="true"
                            className="cursor-grab active:cursor-grabbing group flex flex-col items-center justify-center rounded-2xl border border-neutral-800/80 bg-neutral-950/50 p-5 backdrop-blur-md transition-all hover:border-[#FF3B30]/40 hover:bg-neutral-900/60"
                        >
                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-neutral-400 group-hover:text-[#FF3B30]">
                                <Hand className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-semibold text-neutral-200">Grab State</span>
                            <span className="mt-1 text-[11px] text-neutral-500">Drag or hold card</span>
                            <span className="mt-3 inline-block rounded-lg border border-dashed border-neutral-700 px-3 py-1 text-[11px] font-medium text-neutral-400">
                                Click & Drag
                            </span>
                        </div>
                    </div>
                )}

                {/* Tab 2: Visualizer Tuning Controls */}
                {activeTab === 'playground' && (
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-6 backdrop-blur-md max-w-xl w-full">
                        {/* Bar count selector */}
                        <div className="flex w-full items-center justify-between text-xs">
                            <span className="text-neutral-400">Spectrum Bars: <strong className="text-white">{columnCount} bars</strong></span>
                            <div className="flex gap-2">
                                {[16, 20, 24, 32].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setColumnCount(num)}
                                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${columnCount === num
                                            ? 'bg-[#FF3B30] text-white'
                                            : 'bg-neutral-900 text-neutral-400 hover:text-white'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Idle wave toggle */}
                        <div className="flex w-full items-center justify-between text-xs pt-2 border-t border-neutral-800">
                            <span className="text-neutral-400">Ambient Idle Wave:</span>
                            <button
                                onClick={() => setIdleWave(!idleWave)}
                                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${idleWave
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                                    }`}
                            >
                                <Waves className="h-3 w-3" />
                                <span>{idleWave ? 'Enabled' : 'Disabled'}</span>
                            </button>
                        </div>

                        {/* Cursor Color Selection */}
                        <div className="flex w-full items-center justify-between text-xs pt-2 border-t border-neutral-800">
                            <span className="text-neutral-400">Cursor Accent:</span>
                            <div className="flex items-center gap-2">
                                {colorOptions.map((c) => (
                                    <button
                                        key={c.hex}
                                        onClick={() => setCursorColor(c.hex)}
                                        className={`h-5 w-5 rounded-full transition-transform ${cursorColor === c.hex ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100'
                                            }`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* 6. Footer Navigation with Social Media */}
            <Footer />
        </div>
    );
}
