export const tournamentData = {
  name: "National Karate Championship 2026",
  participants: 320,
  dojos: 42,
  activeRings: 8,
  matchesToday: 156,
};

export const liveMatches = [
  {
    ring: "Ring A",
    fighter1: "Aradhya Singh",
    fighter2: "Fayaj Bin Insal Adib",
    score1: 3,
    score2: 2,
    status: "LIVE",
  },
  {
    ring: "Ring B",
    fighter1: "Nubaid Al Musnad",
    fighter2: "Ayman Safeer",
    score1: 1,
    score2: 4,
    status: "LIVE",
  },
  {
    ring: "Ring C",
    fighter1: "Khandoker Ayan Farzed",
    fighter2: "Sadaqat Alamgir Afnan",
    score1: 2,
    score2: 2,
    status: "LIVE",
  },
];

export const upcomingMatches = [
  {
    time: "09:30 AM",
    ring: "Ring A",
    fighter1: "Mahdi Al Mubassir",
    fighter2: "Nooraz Zaharn Tasif",
  },
  {
    time: "10:00 AM",
    ring: "Ring B",
    fighter1: "Maryyam Zaman Nuba",
    fighter2: "Tayeeba",
  },
];

export const leaderboard = [
  {
    dojo: "ABC Martial Arts Academy",
    gold: 5,
    silver: 3,
    bronze: 2,
  },
  {
    dojo: "Dragon Karate Club",
    gold: 4,
    silver: 4,
    bronze: 3,
  },
];

export const featuredMatch = {
  ring: "Ring A",
  stage: "Semi Final",
  fighter1: {
    name: "Aradhya Singh",
    dojo: "ABC Martial Arts Academy",
    image: "/images/athletes/aradhya.jpg",
    score: 3,
  },
  fighter2: {
    name: "Safwan Abdullah Izan",
    dojo: "Dragon Karate Club",
    image: "/images/athletes/izan.jpg",
    score: 2,
  },
  timeRemaining: "00:48",
  status: "LIVE",
};