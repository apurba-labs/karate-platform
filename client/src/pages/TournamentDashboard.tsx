import React from 'react';
import { 
    tournamentData, 
    liveMatches, 
    upcomingMatches, 
    leaderboard, 
    featuredMatch,
    bracketPreview,
    recentActivities
} from "@/data/tournamentData";

const TournamentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">

        {/* Hero */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 px-8">
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold font-bold">
                    🥋 National Karate Championship 2026
                </h1>

                <span className="animate-pulse bg-red-500 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase">
                    HUGE LIVE
                </span>
            </div>
            

            <p className="text-xl opacity-90">
                Follow every match, score, and bracket in real time.
            </p>
            
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">

            <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-500">Participants</h3>
                <p className="text-4xl font-bold">{tournamentData.participants}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-500">Dojos</h3>
                <p className="text-4xl font-bold">{tournamentData.dojos}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-500">Active Rings</h3>
                <p className="text-4xl font-bold">{tournamentData.activeRings}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-500">Matches Today</h3>
                <p className="text-4xl font-bold">{tournamentData.matchesToday}</p>
            </div>

        </section>

        {/* Featured Live Match */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-10 px-8">

            <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-red-500 animate-pulse text-sm font-bold">
                    🔴 LIVE NOW
                </span>

                <span className="text-sm font-medium opacity-90">
                    {featuredMatch.ring} • {featuredMatch.stage}
                </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">

                {/* Fighter 1 */}
                <div className="text-center">
                    <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden mx-auto mb-4 flex items-center justify-center">
                        <img
                            src={featuredMatch.fighter1.image}
                            alt={featuredMatch.fighter1.name}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: '50% 0%' }}
                        />
                    </div>
                    <h3 className="text-2xl font-bold">
                        {featuredMatch.fighter1.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                        {featuredMatch.fighter1.dojo}
                    </p>
                </div>

                {/* Score */}
                <div className="text-center">
                    <h1 className="text-6xl font-extrabold">
                        {featuredMatch.fighter1.score}
                        <span className="mx-4 text-white/60">VS</span>
                        {featuredMatch.fighter2.score}
                    </h1>

                    <p className="mt-4 text-lg">
                        ⏱ {featuredMatch.timeRemaining} Remaining
                    </p>
                </div>

                {/* Fighter 2 */}
                <div className="text-center">
                    <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden mx-auto mb-4 flex items-center justify-center">
                        <img
                            src={featuredMatch.fighter2.image}
                            alt={featuredMatch.fighter2.name}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: '50% 0%' }}
                        />
                    </div>

                <h3 className="text-2xl font-bold">
                    {featuredMatch.fighter2.name}
                </h3>

                <p className="text-white/80 text-sm">
                    {featuredMatch.fighter2.dojo}
                </p>
                </div>

            </div>
        </section>

        {/* Live Matches */}
        <section className="px-8 pb-8">
            <h2 className="text-3xl font-bold mb-6">
                🔴 Live Matches
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
            {liveMatches.map((match, index) => (
                <div
                key={index}
                className="bg-white rounded-xl p-6 shadow border-l-4 border-red-500"
                >
                    <div className="flex justify-between mb-4">
                        <span className="font-bold">{match.ring}</span>
                        <span className="text-red-500 font-bold">
                        {match.status}
                        </span>
                    </div>

                    <div className="space-y-3">

                        <div className="flex justify-between">
                        <span>{match.fighter1}</span>
                        <span className="font-bold text-2xl">
                            {match.score1}
                        </span>
                        </div>

                        <div className="flex justify-between">
                        <span>{match.fighter2}</span>
                        <span className="font-bold text-2xl">
                            {match.score2}
                        </span>
                        </div>

                    </div>
                </div>
            ))}
            </div>
        </section>

        {/* Upcoming Matches */}
        <section className="px-8 pb-8">
            <h2 className="text-3xl font-bold mb-6">
            📅 Upcoming Matches
            </h2>

            <div className="bg-white rounded-xl shadow overflow-hidden">
            {upcomingMatches.map((match, index) => (
                <div
                key={index}
                className="flex justify-between p-4 border-b"
                >
                <div>
                    <strong>{match.time}</strong>
                </div>

                <div>
                    {match.fighter1} vs {match.fighter2}
                </div>

                <div>{match.ring}</div>
                </div>
            ))}
            </div>
        </section>

        {/* Medal Table */}
        <section className="px-8 pb-12">
            <h2 className="text-3xl font-bold mb-6">
            🏆 Leaderboard
            </h2>

            <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                <tr>
                    <th className="text-left p-4">Dojo</th>
                    <th>🥇</th>
                    <th>🥈</th>
                    <th>🥉</th>
                </tr>
                </thead>

                <tbody>
                {leaderboard.map((dojo, index) => (
                    <tr key={index} className="border-t">
                    <td className="p-4">{dojo.dojo}</td>
                    <td className="text-center">{dojo.gold}</td>
                    <td className="text-center">{dojo.silver}</td>
                    <td className="text-center">{dojo.bronze}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </section>

        {/* Bracket Preview */}
        <section className="px-8 pb-12">
            <h2 className="text-3xl font-bold mb-6">
                🏆 Tournament Bracket Preview
            </h2>

            <div className="bg-white rounded-xl shadow p-8">

                <div className="grid md:grid-cols-3 gap-8">

                {/* Quarter Finals */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-center">
                    Quarter Finals
                    </h3>

                    {bracketPreview.quarterFinals.map((match, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-3 mb-4"
                    >
                        <div className="mb-2">
                            <div className="font-semibold">
                                {match.fighter1.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                {match.fighter1.dojo}
                            </div>
                        </div>

                        <div>
                            <div className="font-semibold">
                                {match.fighter2.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                {match.fighter2.dojo}
                            </div>
                        </div>

                        <div className="mt-3 text-green-600 text-sm font-bold">
                            🏆 Winner: {match.winner}
                        </div>
                    </div>
                    ))}
                </div>

                {/* Semi Finals */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-center">
                    Semi Finals
                    </h3>

                    {bracketPreview.semiFinals.map((match, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-3 mb-4 bg-orange-50"
                    >
                        <div className="mb-2">
                            <div className="font-semibold">
                                {match.fighter1.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                {match.fighter1.dojo}
                            </div>
                        </div>

                        <div>
                            <div className="font-semibold">
                                {match.fighter2.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                {match.fighter2.dojo}
                            </div>
                        </div>

                        <div className="mt-3 text-green-600 text-sm font-bold">
                            🏆 Winner: {match.winner}
                        </div>
                    </div>
                    ))}
                </div>

                {/* Final */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-center">
                    Final
                    </h3>

                    <div className="border-2 border-red-500 rounded-lg p-4 bg-red-50">

                        <div className="mb-2">
                            <div className="font-semibold">
                                {bracketPreview.final.fighter1.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                {bracketPreview.final.fighter1.dojo}
                            </div>
                        </div>

                        <div>
                            TBD
                        </div>

                        <div className="mt-3 text-red-600 font-bold">
                            Championship Match
                        </div>
                    </div>
                </div>

                </div>

            </div>
        </section>

        {/* Recent Activity Feed */}
        <section className="px-8 pb-12">
        <h2 className="text-3xl font-bold mb-6">
            ⚡ Recent Activity
        </h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">

            {recentActivities.map((activity, index) => (
            <div
                key={index}
                className="flex items-start gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
                <div className="text-sm text-gray-500 min-w-[90px]">
                {activity.time}
                </div>

                <div className="flex-1">
                <p className="text-gray-800">
                    {activity.message}
                </p>
                </div>
            </div>
            ))}

        </div>
        </section>

    </div>
  );
};

export default TournamentDashboard;