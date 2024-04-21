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

export interface FootballDetails {
    stream_url: string | null;
    score: string;
    status: string;
    homeTeam: {
        name: string;
        logo: string;
    };
    awayTeam: {
        name: string;
        logo: string;
    };
    "startTime": {
        "date": string;
        "time": string;
    },
}
