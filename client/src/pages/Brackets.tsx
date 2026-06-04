import React from 'react';

const liveMatches = [
  {
    ring: 'Ring A',
    fighter1: 'Ayan Singh',
    fighter2: 'Karim Hasan',
    score1: 3,
    score2: 2,
    status: 'LIVE'
  },
  {
    ring: 'Ring B',
    fighter1: 'John Smith',
    fighter2: 'Tanaka Kenji',
    score1: 1,
    score2: 4,
    status: 'LIVE'
  },
  {
    ring: 'Ring C',
    fighter1: 'Rahim Ahmed',
    fighter2: 'David Lee',
    score1: 2,
    score2: 2,
    status: 'LIVE'
  }
];

const upcomingMatches = [
  {
    time: '09:30 AM',
    ring: 'Ring A',
    fighter1: 'Sakib Rahman',
    fighter2: 'Ali Khan'
  },
  {
    time: '10:00 AM',
    ring: 'Ring B',
    fighter1: 'Ayan Singh',
    fighter2: 'Michael Chen'
  },
  {
    time: '10:15 AM',
    ring: 'Ring C',
    fighter1: 'John Doe',
    fighter2: 'Hasan Karim'
  }
];

const leaderboard = [
  {
    dojo: 'ABC Martial Arts Academy',
    gold: 5,
    silver: 3,
    bronze: 2
  },
  {
    dojo: 'Dragon Karate Club',
    gold: 4,
    silver: 4,
    bronze: 3
  },
  {
    dojo: 'Tiger Dojo',
    gold: 3,
    silver: 2,
    bronze: 5
  }
];

const TournamentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 px-8">
        <h1 className="text-5xl font-bold mb-4">
          🥋 National Karate Championship 2026
        </h1>

        <p className="text-xl opacity-90">
          Follow every match, score, and bracket in real time.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">Participants</h3>
          <p className="text-4xl font-bold">320</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">Dojos</h3>
          <p className="text-4xl font-bold">42</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">Active Rings</h3>
          <p className="text-4xl font-bold">8</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">Matches Today</h3>
          <p className="text-4xl font-bold">156</p>
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

    </div>
  );
};

export default TournamentDashboard;