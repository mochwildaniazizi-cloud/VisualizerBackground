import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
    color?: string;
}

type CursorType = 'default' | 'pointer' | 'text' | 'grab';

export const CustomCursor = ({ color = '#FF3B30' }: CustomCursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [cursorType, setCursorType] = useState<CursorType>('default');

    useEffect(() => {
        let mouseX = -100;
        let mouseY = -100;
        let activeType: CursorType = 'default';

        const trailPositions = Array.from({ length: 11 }, () => ({ x: -100, y: -100 }));

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Deteksi jenis elemen di bawah kursor
            const target = e.target as HTMLElement | null;
            if (target) {
                const computedCursor = window.getComputedStyle(target).cursor;
                let newType: CursorType = 'default';

                if (
                    target.closest('input[type="text"], input[type="email"], input[type="search"], textarea') ||
                    computedCursor === 'text'
                ) {
                    newType = 'text';
                } else if (
                    target.closest('a, button, select, [role="button"], .cursor-pointer') ||
                    computedCursor === 'pointer'
                ) {
                    newType = 'pointer';
                } else if (
                    target.closest('[draggable="true"], .cursor-grab, .cursor-grabbing') ||
                    computedCursor === 'grab' ||
                    computedCursor === 'grabbing'
                ) {
                    newType = 'grab';
                }

                if (newType !== activeType) {
                    activeType = newType;
                    setCursorType(newType);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;

        const render = () => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
            }

            let prevX = mouseX;
            let prevY = mouseY;

            trailPositions.forEach((pos, index) => {
                pos.x += (prevX - pos.x) * 0.35;
                pos.y += (prevY - pos.y) * 0.35;

                const el = trailRefs.current[index];
                if (el) {
                    const scale = 1 - index * 0.055;
                    el.style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${scale})`;
                }

                prevX = pos.x;
                prevY = pos.y;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Render Path SVG berdasarkan jenis kursor
    const renderCursorShape = (type: CursorType, isTrail = false) => {
        switch (type) {
            case 'pointer':
                // Shape Tangan Proporsional & Ramping
                return (
                    <path
                        d="M10 2C9.45 2 9 2.45 9 3V11.27L7.26 9.89C6.88 9.58 6.32 9.61 5.97 9.96L5.3 10.63C5.03 10.9 5.03 11.34 5.3 11.61L10.37 16.68C11.51 17.82 13.06 18.46 14.67 18.46H16.5C18.43 18.46 20 16.89 20 14.96V9.5C20 8.95 19.55 8.5 19 8.5C18.89 8.5 18.79 8.52 18.7 8.55C18.43 7.66 17.61 7 16.63 7C16.37 7 16.12 7.05 15.9 7.14C15.54 6.46 14.83 6 14 6C13.88 6 13.76 6.01 13.65 6.04C13.31 5.42 12.65 5 11.88 5C11.75 5 11.62 5.02 11.5 5.05V3C11.5 2.45 11.05 2 10.5 2H10Z"
                        fill={isTrail ? color : 'url(#cursorGradient)'}
                        fillOpacity={isTrail ? 0.5 : 1}
                        stroke={isTrail ? color : 'white'}
                        strokeWidth={isTrail ? 1 : 1.3}
                        strokeLinejoin="round"
                    />
                );
            case 'text':
                return (
                    <path
                        d="M7 4h10M12 4v16M7 20h10"
                        stroke={isTrail ? color : 'white'}
                        strokeWidth={isTrail ? 2 : 2.5}
                        strokeLinecap="round"
                    />
                );
            case 'grab':
                return (
                    <path
                        d="M18 11V6a2 2 0 0 0-4 0v4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6a7 7 0 0 0 7 7h1a7 7 0 0 0 7-7v-5a2 2 0 0 0-2-2z"
                        fill={isTrail ? color : 'url(#cursorGradient)'}
                        fillOpacity={isTrail ? 0.5 : 1}
                        stroke={isTrail ? color : 'white'}
                        strokeWidth={isTrail ? 1 : 1.5}
                        strokeLinejoin="round"
                    />
                );
            case 'default':
            default:
                return (
                    <path
                        d="M3 3L10.07 19.97L13.58 13.58L19.97 10.07L3 3Z"
                        fill={isTrail ? color : 'url(#cursorGradient)'}
                        fillOpacity={isTrail ? 0.5 : 1}
                        stroke={isTrail ? color : 'white'}
                        strokeWidth={isTrail ? 1 : 1.5}
                        strokeLinejoin="round"
                    />
                );
        }
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
            {/* Menyembunyikan kursor asli bawaan browser secara total */}
            <style>{`* { cursor: none !important; }`}</style>

            {/* 11 Ekor Echo */}
            {Array.from({ length: 11 }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        trailRefs.current[index] = el;
                    }}
                    className="fixed top-0 left-0 will-change-transform"
                    style={{ opacity: ((12 - index) / 15) * 0.6 }}
                >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                    >
                        {renderCursorShape(cursorType, true)}
                    </svg>
                </div>
            ))}

            {/* Kursor Utama */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 will-change-transform"
            >
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ filter: `drop-shadow(0 0 10px ${color})` }}
                >
                    {renderCursorShape(cursorType, false)}
                    <defs>
                        <linearGradient
                            id="cursorGradient"
                            x1="3"
                            y1="3"
                            x2="19.97"
                            y2="19.97"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="40%" stopColor={color} />
                            <stop offset="100%" stopColor="#500000" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};
