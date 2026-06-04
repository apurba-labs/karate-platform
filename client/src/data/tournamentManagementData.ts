export const tournamentManagementData = {
  tournament: {
    name: "National Karate Championship 2026",
    location: "Dhaka Sports Complex",
    date: "2026-06-15",
    status: "LIVE",
    participants: 320,
    matches: 156,
    completedMatches: 87,
    remainingMatches: 69,
    activeRings: 8,
  },

  quickActions: [
    "Start Match",
    "Generate Bracket",
    "Publish Results",
    "Export Report"
  ]
};

export const rings = [
  {
    id: 1,
    name: "Ring A",
    status: "LIVE",
    referee: "John Doe",
    currentMatch: "Aradhya Singh vs Karim Hasan"
  },
  {
    id: 2,
    name: "Ring B",
    status: "READY",
    referee: "Michael Chen",
    currentMatch: "Safwan Abdullah vs Rahim Ahmed"
  }
];

export const participants = [
  {
    id: 1,
    name: "Aradhya Singh",
    dojo: "ABC Martial Arts Academy",
    category: "U12 Kumite",
    belt: "Brown",
    status: "Active"
  },
  {
    id: 2,
    name: "Karim Hasan",
    dojo: "Dragon Karate Club",
    category: "U12 Kumite",
    belt: "Blue",
    status: "Active"
  }
];