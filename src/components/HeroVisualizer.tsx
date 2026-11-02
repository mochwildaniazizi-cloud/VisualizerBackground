import { useEffect, useRef } from 'react';

export interface VisualizerConfig {
    columnCount?: number;
    spread?: number; // Distance multiplier (default 4.5)
    idleWave?: boolean; // Subtle floating wave when idle
    intensity?: number; // 0.5 to 2.0
}

interface HeroVisualizerProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    columnCount?: number;
    idleWave?: boolean;
    colorAccent?: string;
}

export const HeroVisualizer = ({
    containerRef,
    columnCount = 24,
    idleWave = true,
}: HeroVisualizerProps) => {
    const columns = Array.from({ length: columnCount }, (_, i) => i);
    const colRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let mouseX = -1;
        let mouseY = -1;
        let isHovered = false;
        let lastMoveTime = 0;

        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;
            isHovered = true;
            lastMoveTime = performance.now();
        };

        const handleMouseLeave = () => {
            isHovered = false;
            mouseX = -1;
            mouseY = -1;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        let animationFrameId: number;

        const render = (time: number) => {
            const isIdle = !isHovered || mouseX < 0 || mouseY < 0 || (time - lastMoveTime > 3500);

            colRefs.current.forEach((el, colIndex) => {
                if (!el) return;

                const colCenter = (colIndex + 0.5) / columnCount;

                if (!isIdle) {
                    // Active mouse reactive mode
                    const distance = Math.abs(mouseX - colCenter);
                    const activePower = Math.max(0, 1 - distance * 4.2);

                    const targetHeightPercent = (1 - mouseY) * 100;
                    const currentHeight = targetHeightPercent * activePower;

                    el.style.height = `${currentHeight}%`;
                    el.style.opacity = activePower > 0 ? '1' : '0';
                } else if (idleWave) {
                    // Ambient breathing equalizer wave when idle
                    const t = time * 0.002;
                    const wave1 = Math.sin(colIndex * 0.45 + t);
                    const wave2 = Math.cos(colIndex * 0.25 - t * 0.7);
                    const wave3 = Math.sin(colIndex * 0.8 + t * 1.5) * 0.5;
                    const combined = (wave1 + wave2 + wave3 + 2.5) / 5; // 0 to 1
                    const ambientHeight = Math.max(6, combined * 42);

                    el.style.height = `${ambientHeight}%`;
                    el.style.opacity = `${0.35 + combined * 0.5}`;
                } else {
                    el.style.height = '0%';
                    el.style.opacity = '0';
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [containerRef, columnCount, idleWave]);

    return (
        <div className="absolute inset-0 z-0 flex overflow-hidden bg-black pointer-events-none select-none">
            {/* 1. LAYER KOTAK-KOTAK SPEKTRUM */}
            <div className="flex h-full w-full items-end justify-between gap-[2px]">
                {columns.map((colIndex) => (
                    <div
                        key={colIndex}
                        className="relative flex h-full flex-1 items-end"
                    >
                        <div
                            ref={(el) => {
                                colRefs.current[colIndex] = el;
                            }}
                            className="w-full bg-gradient-to-t from-black via-[#750606] to-[#C01111] will-change-[height,opacity] shadow-[0_0_24px_rgba(192,17,17,0.5)] transition-[height] duration-75 ease-out rounded-t-sm"
                            style={{
                                height: '0%',
                                opacity: 0,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* 2. LAYER EFEK NOISE TEXTURE */}
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.09] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* 3. DARK GRADIENT OVERLAY */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-transparent to-black/60" />

            {/* 4. SUBTLE RADIAL VIGNETTE */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
        </div>
    );
};
