import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const stats = {
    participants: 320,
    dojos: 42,
    activeRings: 8,
    matchesToday: 156
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-xs font-semibold mb-4">
                🥋 Live Tournament Experience
              </span>

              {/* Heading - adjusted for better fit */}
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                  Follow Every Match.
                  <span className="block">Track Every Score.</span>
                  <span className="block">Never Miss A Tournament.</span>
                </h1>
              
                <p className="text-base md:text-lg text-white/90 mb-6 max-w-xl leading-relaxed">
                  A modern martial arts tournament dashboard designed for parents, coaches, athletes, and organizers. Follow live matches, brackets, schedules, and results from anywhere.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/tournament-dashboard"
                  className="px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition inline-block text-sm md:text-base"
                >
                  View Live Tournament
                </Link>

                <Link
                  to="/brackets"
                  className="px-5 py-2.5 border-2 border-white/40 hover:bg-white/10 rounded-lg font-semibold transition inline-block text-sm md:text-base"
                >
                  Explore Brackets
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="mt-6 lg:mt-0">
              <div className="bg-white/10 rounded-2xl h-[420px] flex items-center justify-center">
                <img
                  src="/images/karate-arena.jpg"
                  alt="Tournament"
                  className="rounded-2xl shadow-2xl w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-red-500">
                {stats.participants}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Participants
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-red-500">
                {stats.dojos}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Dojos
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-red-500">
                {stats.activeRings}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Active Rings
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-red-500">
                {stats.matchesToday}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Matches Today
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Everything You Need During A Tournament
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: '🥊',
                title: 'Live Match Tracking',
                desc: 'Follow active matches and scores in real time.'
              },
              {
                icon: '🏆',
                title: 'Tournament Brackets',
                desc: 'Visualize athlete progression throughout the competition.'
              },
              {
                icon: '📅',
                title: 'Competition Schedule',
                desc: 'Know exactly when and where matches are happening.'
              },
              {
                icon: '📊',
                title: 'Real-Time Scoreboard',
                desc: 'Keep parents and coaches informed instantly.'
              }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 rounded-xl p-5 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="text-base font-bold mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tournament */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-3">
              🥋 National Karate Championship 2026
            </h2>
            <p className="text-sm text-slate-600 mb-1">
              320 Participants • 42 Dojos • 8 Active Rings
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Follow live scores, brackets, rankings and match progress.
            </p>
            <Link
              to="/tournament-dashboard"
              className="inline-block px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition text-sm"
            >
              Launch Tournament Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-red-500 to-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Experience A Martial Arts Tournament Like Never Before
          </h2>
          <p className="text-sm md:text-base mb-4 text-white/90">
            Built for parents, coaches, athletes and organizers.
          </p>
          <Link
            to="/tournament-dashboard"
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-semibold shadow-lg transition"
          >
            View Live Dashboard
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;