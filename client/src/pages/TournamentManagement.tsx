import React from "react";
import { tournamentManagementData, rings } from "@/data/tournamentManagementData";

const TournamentManagement: React.FC = () => {
  const { tournament, quickActions } = tournamentManagementData;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          🏢 Tournament Center
        </h1>

        <p className="text-gray-600 mb-8">
          Manage tournaments, rings, participants and results.
        </p>

        {/* Tournament Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Participants</p>
            <h2 className="text-3xl font-bold">
              {tournament.participants}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Matches</p>
            <h2 className="text-3xl font-bold">
              {tournament.matches}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold">
              {tournament.completedMatches}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Remaining</p>
            <h2 className="text-3xl font-bold">
              {tournament.remainingMatches}
            </h2>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-4">
            ⚡ Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <button
                key={action}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                {action}
              </button>
            ))}
          </div>

        </div>

        {/* Active Rings */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            🥋 Active Rings
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {rings.map((ring) => (
              <div
                key={ring.id}
                className="border rounded-xl p-4"
              >
                <h3 className="font-bold">
                  {ring.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Referee: {ring.referee}
                </p>

                <p className="mt-2">
                  {ring.currentMatch}
                </p>

                <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {ring.status}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default TournamentManagement;