import React from "react";
import { bracketPreview } from "@/data/tournamentData";

const TournamentBrackets: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          🏆 Tournament Brackets
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Quarter Finals */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-xl mb-4">
              Quarter Finals
            </h2>

            {bracketPreview.quarterFinals.map((match, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4"
              >
                <div className="font-semibold">
                  {match.fighter1.name}
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  {match.fighter1.dojo}
                </div>

                <div className="font-semibold">
                  {match.fighter2.name}
                </div>

                <div className="text-xs text-gray-500">
                  {match.fighter2.dojo}
                </div>

                <div className="mt-3 text-green-600 text-sm font-bold">
                  🏆 Winner: {match.winner}
                </div>
              </div>
            ))}
          </div>

          {/* Semi Finals */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-xl mb-4">
              Semi Finals
            </h2>

            {bracketPreview.semiFinals.map((match, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4"
              >
                <div className="font-semibold">
                  {match.fighter1.name}
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  {match.fighter1.dojo}
                </div>

                <div className="font-semibold">
                  {match.fighter2.name}
                </div>

                <div className="text-xs text-gray-500">
                  {match.fighter2.dojo}
                </div>

                <div className="mt-3 text-green-600 text-sm font-bold">
                  🏆 Winner: {match.winner}
                </div>
              </div>
            ))}
          </div>

          {/* Final */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-xl mb-4">
              Final
            </h2>

            <div className="border-2 border-red-500 bg-red-50 rounded-xl p-4">

              <div className="font-semibold">
                {bracketPreview.final.fighter1.name}
              </div>

              <div className="text-xs text-gray-500 mb-2">
                {bracketPreview.final.fighter1.dojo}
              </div>

              <div className="font-semibold">
                {bracketPreview.final.fighter2.name}
              </div>

              <div className="text-xs text-gray-500">
                {bracketPreview.final.fighter2.dojo}
              </div>

              <div className="mt-4 text-red-600 font-bold">
                🏆 Championship Match
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TournamentBrackets;