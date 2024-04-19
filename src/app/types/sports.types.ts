export interface FootballTournament {
    league: {
        name: string;
        img: string;
    },
    competitions: FootballCompetition[];
}

export interface FootballCompetition {
    team1: {
        name: string;
        img: string;
    },
    team2: {
        name: string;
        img: string;
    },
    score: string;
    url: string;
}