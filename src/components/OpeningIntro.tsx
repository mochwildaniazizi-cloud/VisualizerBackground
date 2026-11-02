import { useEffect, useState } from 'react';

interface OpeningIntroProps {
    onComplete?: () => void;
    key?: React.Key;
}

export const OpeningIntro = ({ onComplete }: OpeningIntroProps) => {
    // Melacak status terbuka untuk layer depan dan belakang per kolom (true/false)
    const [frontStates, setFrontStates] = useState<{ [key: number]: boolean }>({});
    const [backStates, setBackStates] = useState<{ [key: number]: boolean }>({});
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Reset states
        setFrontStates({});
        setBackStates({});
        setIsHidden(false);

        const sequence = [
            [3],
            [2, 4],
            [1, 5],
            [0, 6]
        ];

        const timeouts: number[] = [];

        // --- 1. ANIMASI LAYER DEPAN (Dimulai dari 0ms) ---
        sequence.forEach((group, groupIndex) => {
            const frontTime = groupIndex * 180; // Jeda antar kelompok depan

            const t = window.setTimeout(() => {
                setFrontStates((prev) => {
                    const next = { ...prev };
                    group.forEach((col) => {
                        next[col] = true;
                    });
                    return next;
                });
            }, frontTime);
            timeouts.push(t);
        });

        // --- 2. ANIMASI LAYER BELAKANG (Mulai tepat saat kelompok [2, 4] depan terbuka) ---
        const backStartTime = 180;

        sequence.forEach((group, groupIndex) => {
            const backTime = backStartTime + (groupIndex * 180);

            const t = window.setTimeout(() => {
                setBackStates((prev) => {
                    const next = { ...prev };
                    group.forEach((col) => {
                        next[col] = true;
                    });
                    return next;
                });
            }, backTime);
            timeouts.push(t);
        });

        // Total durasi sebelum intro ditutup total
        const totalTime = backStartTime + (sequence.length - 1) * 180 + 500;
        const timerEnd = window.setTimeout(() => {
            setIsHidden(true);
            if (onComplete) onComplete();
        }, totalTime);
        timeouts.push(timerEnd);

        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [onComplete]);

    if (isHidden) return null;

    // 7 Kolom (Indeks 0 s.d. 6)
    const columns = [0, 1, 2, 3, 4, 5, 6];

    return (
        <div className="fixed inset-0 z-[100] flex flex-col justify-between pointer-events-none overflow-hidden bg-transparent">

            {/* ================= LAYER ATAS ================= */}
            <div className="w-full h-[50vh] flex">
                {columns.map((colIndex) => {
                    const isFrontOpen = frontStates[colIndex] || false;
                    const isBackOpen = backStates[colIndex] || false;

                    return (
                        <div key={`top-col-${colIndex}`} className="flex-1 h-full relative overflow-hidden">

                            {/* Kotak Belakang (Layer Bawah - z-10) */}
                            <div
                                className={`absolute inset-0 z-10 bg-gradient-to-b from-black via-[#4a0303] to-[#990e0e] transition-transform duration-400 ease-in-out shadow-sm ${
                                    isBackOpen ? '-translate-y-full' : 'translate-y-0'
                                }`}
                            />

                            {/* Kotak Depan (Layer Atas - z-20) */}
                            <div
                                className={`absolute inset-0 z-20 bg-gradient-to-b from-black via-[#750606] to-[#C01111] transition-transform duration-400 ease-in-out shadow-md ${
                                    isFrontOpen ? '-translate-y-full' : 'translate-y-0'
                                }`}
                            />

                        </div>
                    );
                })}
            </div>

            {/* ================= LAYER BAWAH ================= */}
            <div className="w-full h-[50vh] flex">
                {columns.map((colIndex) => {
                    const isFrontOpen = frontStates[colIndex] || false;
                    const isBackOpen = backStates[colIndex] || false;

                    return (
                        <div key={`bottom-col-${colIndex}`} className="flex-1 h-full relative overflow-hidden">

                            {/* Kotak Belakang (Layer Bawah - z-10) */}
                            <div
                                className={`absolute inset-0 z-10 bg-gradient-to-b from-[#990e0e] via-[#4a0303] to-black transition-transform duration-400 ease-in-out shadow-sm ${
                                    isBackOpen ? 'translate-y-full' : 'translate-y-0'
                                }`}
                            />

                            {/* Kotak Depan (Layer Atas - z-20) */}
                            <div
                                className={`absolute inset-0 z-20 bg-gradient-to-b from-[#C01111] via-[#750606] to-black transition-transform duration-400 ease-in-out shadow-md ${
                                    isFrontOpen ? 'translate-y-full' : 'translate-y-0'
                                }`}
                            />

                        </div>
                    );
                })}
            </div>

        </div>
    );
};
