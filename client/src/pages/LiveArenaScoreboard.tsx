import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

interface MatchState {
    akaName: string;
    akaDojo: string;
    akaScore: number;
    akaFouls: number;
    akaImage: string;
    aoName: string;
    aoDojo: string;
    aoScore: number;
    aoFouls: number;
    aoImage: string;
    secondsLeft: number;
    category: string;
    matchLog: string[];
}

const LiveArenaScoreboard: React.FC = () => {
    const { ringId } = useParams<{ ringId: string }>();

    // Intro Countdown States
    const [introSeconds, setIntroSeconds] = useState<number>(3);
    const [isIntroActive, setIsIntroActive] = useState<boolean>(true);

    // Animation Toggles
    const [akaAnimation, setAkaAnimation] = useState<string>("");
    const [aoAnimation, setAoAnimation] = useState<string>("");
    
    // Slide/Fade overlay trigger for the top log entry
    const [animateNewLog, setAnimateNewLog] = useState<boolean>(false);

    const [match, setMatch] = useState<MatchState>({
        akaName: "Aradhya Singh",
        akaDojo: "ABC Martial Arts Academy",
        akaScore: 0,
        akaFouls: 0,
        akaImage: "/images/athletes/aradhya.jpg",
        
        aoName: "Safwan Abdullah Izan",
        aoDojo: "Dragon Karate Club",
        aoScore: 0,
        aoFouls: 0,
        aoImage: "/images/athletes/izan.jpg",
        
        secondsLeft: 45, 
        category: "Boys Kumite Under-6 Grand Final",
        matchLog: ["📺 Arena broadcast feed initialized."]
    });

    const [isRunning, setIsRunning] = useState(false);

    // 🔊 Native Browser Referee Whistle Sound Generator (No file assets needed!)
    const playWhistleSound = (isDouble = false) => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const triggerWhistle = (startTime: number, duration: number) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                // High-pitched trilling whistle frequency (typical electronic referee whistle)
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2300, startTime); 
                // Add a rapid vibrato trill effect
                osc.frequency.linearRampToValueAtTime(2400, startTime + duration * 0.3);
                osc.frequency.linearRampToValueAtTime(2250, startTime + duration * 0.6);
                
                gain.gain.setValueAtTime(0.3, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            if (isDouble) {
                triggerWhistle(ctx.currentTime, 0.15);
                triggerWhistle(ctx.currentTime + 0.20, 0.35); // Double blast for major events
            } else {
                triggerWhistle(ctx.currentTime, 0.25); // Single short blast
            }
        } catch (e) {
            console.log("Audio play blocked by browser interaction policy");
        }
    };

    // 1. Initial Pre-Match Countdown Timer
    useEffect(() => {
        if (!isIntroActive) return;

        const introTimer = setInterval(() => {
            setIntroSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(introTimer);
                    setIsIntroActive(false);
                    setIsRunning(true); 
                    playWhistleSound(true); // Double blast for fight start!
                    setMatch(m => ({
                        ...m,
                        matchLog: ["🥋 Hajime! (Start Fight)", ...m.matchLog]
                    }));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(introTimer);
    }, [isIntroActive]);

    // 2. Main Match Simulation Logic
    useEffect(() => {
        if (!isRunning || isIntroActive || match.secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setMatch(prev => {
                const isEvent = Math.random() < 0.28; 
                let nextState = { ...prev, secondsLeft: prev.secondsLeft - 1 };

                if (nextState.secondsLeft === 0) {
                    let winner = "Draw";
                    if (nextState.akaScore > nextState.aoScore) winner = nextState.akaName;
                    else if (nextState.aoScore > nextState.akaScore) winner = nextState.aoName;
                    
                    nextState.matchLog = [`🏆 Match completed! Winner: ${winner}`, ...nextState.matchLog];
                    playWhistleSound(true); // Double blast for match finish
                    return nextState;
                }

                if (isEvent) {
                    const isAka = Math.random() > 0.5;
                    const eventType = Math.random();
                    
                    // Trigger entry slide overlay animation
                    setAnimateNewLog(true);
                    setTimeout(() => setAnimateNewLog(false), 400);
                    
                    playWhistleSound(false); // Play whistle sound for point/foul!

                    if (eventType < 0.80) {
                        const pointsPool = [1, 2, 3];
                        const point = pointsPool[Math.floor(Math.random() * pointsPool.length)];
                        const ptLabel = point === 1 ? "Yuko (1pt)" : point === 2 ? "Waza-ari (2pt)" : "Ippon (3pt)";

                        if (isAka) {
                            nextState.akaScore += point;
                            nextState.matchLog = [`🔴 AKA (${nextState.akaName}) scores ${ptLabel}!`, ...nextState.matchLog];
                            setAkaAnimation("scale-105 bg-red-500/10 shadow-xl ring-4 ring-red-500/30");
                            setTimeout(() => setAkaAnimation(""), 1000);
                        } else {
                            nextState.aoScore += point;
                            nextState.matchLog = [`🔵 AO (${nextState.aoName}) scores ${ptLabel}!`, ...nextState.matchLog];
                            setAoAnimation("scale-105 bg-blue-500/10 shadow-xl ring-4 ring-blue-500/30");
                            setTimeout(() => setAoAnimation(""), 1000);
                        }
                    } else {
                        if (isAka) {
                            nextState.akaFouls += 1;
                            nextState.matchLog = [`⚠️ Penalty warning issued to AKA (${nextState.akaFouls}/4)`, ...nextState.matchLog];
                            setAkaAnimation("bg-yellow-500/10 ring-4 ring-yellow-500/30");
                            setTimeout(() => setAkaAnimation(""), 800);
                        } else {
                            nextState.aoFouls += 1;
                            nextState.matchLog = [`⚠️ Penalty warning issued to AO (${nextState.aoFouls}/4)`, ...nextState.matchLog];
                            setAoAnimation("bg-yellow-500/10 ring-4 ring-yellow-500/30");
                            setTimeout(() => setAoAnimation(""), 800);
                        }
                    }
                }

                if (nextState.matchLog.length > 4) {
                    nextState.matchLog = nextState.matchLog.slice(0, 4);
                }

                return nextState;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, isIntroActive, match.secondsLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleReset = () => {
        setIntroSeconds(3);
        setIsIntroActive(true);
        setIsRunning(false);
        setMatch({
            akaName: "Aradhya Singh",
            akaDojo: "ABC Martial Arts Academy",
            akaScore: 0,
            akaFouls: 0,
            akaImage: "/images/athletes/aradhya.jpg",
            aoName: "Safwan Abdullah Izan",
            aoDojo: "Dragon Karate Club",
            aoScore: 0,
            aoFouls: 0,
            aoImage: "/images/athletes/izan.jpg",
            secondsLeft: 45,
            category: "Boys Kumite Under-6 Grand Final",
            matchLog: ["🥋 Arena reset. Awaiting fighters..."]
        });
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Hero Header */}
            <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-red-500 px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow">
                            {isIntroActive ? "🎥 PRE-MATCH" : "🔴 LIVE ARENA"}
                        </span>
                        <span className="font-semibold bg-black/20 px-3 py-1 rounded-md text-sm">
                            {ringId ? `Tatami Arena ${ringId.toUpperCase()}` : "Ring Mat A"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Live Match Arena</h1>
                    <p className="text-white/90 text-sm md:text-base">Real-time parent overview portal dashboard.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto p-6">
                
                {/* 3-Second Global TV Screen Intro Overlay */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-8 relative border-4 border-gray-900">
                    <div className="h-[320px] flex flex-col items-center justify-center text-white p-4">
                        {isIntroActive ? (
                            <div className="text-center animate-pulse">
                                <div className="text-xs tracking-widest text-orange-400 font-extrabold uppercase mb-2">FIGHTERS BOWING IN</div>
                                <div className="text-8xl font-black font-mono text-white select-none">{introSeconds}</div>
                                <div className="text-xl font-semibold text-gray-400 mt-2">Get Ready...</div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-6xl mb-3 animate-bounce">📹</div>
                                <h2 className="text-xl font-bold tracking-wide">Live Video Streaming Feed</h2>
                                <p className="text-xs text-gray-500 mt-2 bg-gray-900/60 px-4 py-1.5 rounded-full inline-block">
                                    Parent Portal Stream Online
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scoreboard Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
                    
                    {/* AKA COMPETITOR BOX WITH IMAGE */}
                    <div className={`bg-white border-t-8 border-red-600 rounded-2xl p-6 text-center shadow-md transform transition-all duration-300 flex flex-col justify-between items-center ${
                        akaAnimation ? akaAnimation : "hover:scale-[1.01]"
                    }`}>
                        <div className="text-xs font-black tracking-widest bg-red-600 text-white py-1 px-4 rounded-full shadow mb-4">AKA (RED)</div>
                        
                        <div className="w-28 h-28 rounded-full border-4 border-red-100 overflow-hidden shadow-inner mb-3 bg-slate-100 flex items-center justify-center">
                            <img 
                                src={match.akaImage} 
                                alt={match.akaName}
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150/ef4444/white?text=AKA"; }}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: '50% 15%' }}
                            />
                        </div>

                        <h3 className="text-xl font-extrabold text-gray-800 tracking-tight truncate max-w-full">{match.akaName}</h3>
                        <p className="text-gray-400 text-xs mt-0.5 font-medium">{match.akaDojo}</p>
                        
                        <div className="text-7xl font-black text-red-600 mt-3 font-mono tracking-tighter">{match.akaScore}</div>
                        
                        <div className="mt-4 text-xs bg-red-50 text-red-700 font-bold py-1.5 px-4 rounded-full border border-red-100 w-full max-w-[180px]">
                            Fouls: {match.akaFouls > 0 ? '⚠️ '.repeat(match.akaFouls) : <span className="opacity-40 font-normal">None</span>}
                        </div>
                    </div>

                    {/* TIMER BOARD CENTER BOX */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-xl border border-slate-800 flex flex-col justify-center items-center py-8 lg:py-6">
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-black mb-3">Arena Clock</div>
                        
                        <div className={`text-6xl font-black font-mono bg-black px-8 py-4 rounded-2xl border-2 shadow-inner transition-colors duration-200 ${
                            isIntroActive ? "text-yellow-400 border-yellow-600 animate-pulse" : 
                            match.secondsLeft <= 15 ? "text-red-500 border-red-600 animate-pulse" : "text-emerald-400 border-slate-800"
                        }`}>
                            {isIntroActive ? "READY" : formatTime(match.secondsLeft)}
                        </div>

                        <div className="flex gap-2 w-full mt-6 max-w-[220px]">
                            <button
                                disabled={isIntroActive}
                                onClick={() => setIsRunning(!isRunning)}
                                className={`flex-1 py-2.5 px-4 text-xs font-bold text-white rounded-xl shadow transition duration-150 uppercase tracking-wider ${
                                    isIntroActive ? "bg-slate-800 cursor-not-allowed text-slate-600 border border-slate-700" :
                                    isRunning ? "bg-amber-500 hover:bg-amber-600 shadow-amber-900/20" : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-900/20"
                                }`}
                            >
                                {isIntroActive ? "Locked" : isRunning ? "Pause" : "Resume"}
                            </button>
                            <button
                                onClick={handleReset}
                                className="py-2.5 px-4 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl shadow border border-slate-700 transition duration-150 uppercase tracking-wider"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* AO COMPETITOR BOX WITH IMAGE */}
                    <div className={`bg-white border-t-8 border-blue-600 rounded-2xl p-6 text-center shadow-md transform transition-all duration-300 flex flex-col justify-between items-center ${
                        aoAnimation ? aoAnimation : "hover:scale-[1.01]"
                    }`}>
                        <div className="text-xs font-black tracking-widest bg-blue-600 text-white py-1 px-4 rounded-full shadow mb-4">AO (BLUE)</div>
                        
                        <div className="w-28 h-28 rounded-full border-4 border-blue-100 overflow-hidden shadow-inner mb-3 bg-slate-100 flex items-center justify-center">
                            <img 
                                src={match.aoImage} 
                                alt={match.aoName}
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150/3b82f6/white?text=AO"; }}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: '50% 15%' }}
                            />
                        </div>

                        <h3 className="text-xl font-extrabold text-gray-800 tracking-tight truncate max-w-full">{match.aoName}</h3>
                        <p className="text-gray-400 text-xs mt-0.5 font-medium">{match.aoDojo}</p>
                        
                        <div className="text-7xl font-black text-blue-600 mt-3 font-mono tracking-tighter">{match.aoScore}</div>
                        
                        <div className="mt-4 text-xs bg-blue-50 text-blue-700 font-bold py-1.5 px-4 rounded-full border border-blue-100 w-full max-w-[180px]">
                            Fouls: {match.aoFouls > 0 ? '⚠️ '.repeat(match.aoFouls) : <span className="opacity-40 font-normal">None</span>}
                        </div>
                    </div>
                </div>

                {/* Event Feed: Fixed Layout with Inward Content Slide & Color Wipe */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-slate-100">
                    <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                        <span>⚡</span> Live Action Broadcast Feed
                    </h2>
                    <div className="space-y-3">
                        {match.matchLog.map((event, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden h-12 rounded-xl border border-slate-100 bg-slate-50 flex items-center"
                            >
                                {/* Fixed Highlight Box — Content transitions inside it smoothly without shifting */}
                                <div 
                                    className={`absolute inset-0 flex items-center px-4 text-sm font-medium transition-all duration-300 ${
                                        index === 0
                                            ? `bg-emerald-50 text-slate-900 border-l-4 border-emerald-500 font-bold ${
                                                animateNewLog 
                                                    ? 'opacity-0 -translate-x-4 bg-emerald-200/50' 
                                                    : 'opacity-100 translate-x-0'
                                              }`
                                            : 'text-slate-400 opacity-60'
                                    }`}
                                >
                                    {event}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Match Information Cards */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
                    <h2 className="text-lg font-black text-slate-800 mb-4">🥋 Arena Event Meta Information</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Category</span>
                            <span className="font-semibold text-slate-700">{match.category}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tatami Location</span>
                            <span className="font-semibold text-slate-700">Arena Mat A</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tournament Status</span>
                            <span className={`font-bold ${isIntroActive ? "text-amber-500" : "text-red-500 animate-pulse"}`}>
                                {isIntroActive ? "PRE-MATCH" : "LIVE"}
                            </span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Round Pool</span>
                            <span className="font-semibold text-slate-700">Grand Finals</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LiveArenaScoreboard;