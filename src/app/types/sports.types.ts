export interface SportTournament {
    leagueName: string;
    leagueLogo: string;
    lineups: SportLineupData[];
}

export interface SportLineupData {
    startTime: string;
    match_id: string;
    homeTeam: SportLineupTeamData;
    awayTeam: SportLineupTeamData;
}

export interface SportLineupTeamData {
    name: string;
    logo: string;
    score: string;
}

export interface FootballDetails {
    stream_url: string | null;
    score: string;
    status: string;
    league_name: string;
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
    links: string[],
}
