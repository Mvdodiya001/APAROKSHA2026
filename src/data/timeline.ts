export interface TimelineEvent {
  id: string;
  name: string;
  time: string;
  description?: string;
  link?: string;
}

export interface TimelineDay {
  day: string;
  events: TimelineEvent[];
}

export const timelineData: TimelineDay[] = [
  {
    day: "Day -1",
    events: [
      {
        id: "cicada",
        name: "Cicada",
        time: "8:30pm - 4:00am (next day)",
        description: "Its a whole night treasure hunt like event where clues will be placed at different physical spots, the participants will begin with a challenge and upon solving it they will be guided to a physical spot where they will find the clue for the next problem. The team completing all the challenges or with the maximum points will win.",
      }
    ]
  },
  {
    day: "Day 0",
    events: [
      {
        id: "quant-sim",
        name: "Quant Sim Trading / Pokerbots",
        time: "TBD",
        description: "PokerBots is an algorithmic competition where participants develop autonomous agents for a custom poker variant, focusing on probabilistic modeling, game-theoretic strategies, and decision-making under uncertainty. Bots compete in structured matches, requiring efficient algorithms, opponent modeling, and optimal policy design.",
        link: "https://www.iitpokerbots.in/"
      },
      {
        id: "inauguration",
        name: "Inauguration",
        time: "4:00 pm - 8:00 pm",
      },
      {
        id: "cpl",
        name: "Coding Premier League",
        time: "9:30pm - 11:30pm",
        description: "(only the finale is during APK). 2 hrs duration. Auction and league matches will be done beforehand and format is similar to ipl , money used in auctions will be virtual. In a match between 2 teams in each round both teams will send their one player who will compete in a coding duel, team size 4 and 1 girl is must and after after 4 rounds team with more wins will get a point)"
      },
      {
        id: "ctf-d0",
        name: "CTF",
        time: "10:00pm - 6:00pm (next day)",
        description: "CTF is a cybersecurity competition where players solve independent puzzles across categories like Web, Crypto, and Reverse Engineering to find hidden \"flags.\" Each challenge is worth a specific number of points, often decreasing in value as more teams solve them (dynamic scoring). The team with the highest points win."
      }
    ]
  },
  {
    day: "Day 1",
    events: [
      {
        id: "ctf-d1",
        name: "CTF",
        time: "till 6:00 pm",
        description: "continued"
      },
      {
        id: "techno-quiz",
        name: "Techomanagement Quiz",
        time: "10:00am - 12:00pm",
        description: "android quiz"
      },
      {
        id: "lang-challenge",
        name: "Lang Challenge",
        time: "12:30pm - 2:00pm",
        description: "participants will learn and use new coding language on the spot"
      },
      {
        id: "ipo-pitching",
        name: "Ipo Pitching",
        time: "4:00 pm - 5:00 pm",
        description: "teams of students who will advertise their IPO, teams with highest sold shares will be winners, point division will be based on ads made or their own creativity maximise sold shares"
      },
      {
        id: "keynote-d1",
        name: "Keynote Speaker Session*",
        time: "6:45pm - 7:45pm",
      },
      {
        id: "speaker2-d1",
        name: "Speaker 2",
        time: "7:45pm - 8:45pm",
      },
      {
        id: "ex-machina",
        name: "Ex-Machina",
        time: "TBD",
        description: "Ex-Machina is a flagship Machine Learning and Artificial Intelligence competition under Aparoksha, the annual technical festival of IIIT Allahabad. It features Kaggle-style, team-based challenges where participants work on real-world datasets to build, optimize, and evaluate predictive models. The event typically includes multiple phases and focuses on data analysis, algorithm design, and AI modeling, providing participants with hands-on experience in solving practical ML problems."
      },
      {
        id: "virtuosi",
        name: "Virtuosi",
        time: "9:30 pm (till end)",
      }
    ]
  },
  {
    day: "Day 2",
    events: [
      {
        id: "cfresh",
        name: "CFresh",
        time: "10:00am - 1:30pm",
        description: "CFresh is a competitive programming contest under Aparoksha exclusively for first-year students, where participants solve algorithmic problems within a fixed time on an online judging platform. It focuses on testing coding accuracy, efficiency, and logical thinking, providing freshers with real contest experience and a strong introduction to competitive programming"
      },
      {
        id: "codered",
        name: "CodeRed",
        time: "10:00am - 3:30pm",
        description: "CodeRed by Aparoksha is a team-based coding contest with timed member rotations. Each participant codes within fixed intervals, handing off solutions during transition windows. Teams are ranked by the number of accepted solutions."
      },
      {
        id: "eda-design",
        name: "EDA Design",
        time: "2:00pm - 6:00pm",
      },
      {
        id: "keynote-d2",
        name: "Keynote Speaker Session*",
        time: "6:30pm - 7:30pm"
      },
      {
        id: "speaker2-d2",
        name: "Speaker 2",
        time: "7:30pm - 8:30pm"
      },
      {
        id: "movie-nights",
        name: "Movie Nights",
        time: "9:15pm - 12:30 am"
      }
    ]
  }
];
