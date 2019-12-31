declare const axios: any;

import { setSteamUser, getSteamUser, setSteamGameCache } from './trello-util';

const serverURL = 'http://localhost:3000';

export type SteamGame = {
    id: number;
    name: string;
    mins: number;
};

type GameResponse = {
    response: {
        games: SteamGame[],
    }
}

export type SteamUser = {
    displayName: string;
    avatarUrl: string;
    id: string;
};

// Sort by playtime first and name second
function compare(a: SteamGame, b: SteamGame): number {
    if (a.mins > b.mins) {
        return 1;
    }

    if (a.mins < b.mins) {
        return -1
    }

    if (a.name > b.name) {
        return 1;
    }

    if (a.name < b.name ) {
        return -1
    }
    
    return 0;
  }
  
export const getOwnedGames = async (t, id?: string): Promise<SteamGame[]> => {
    let userId = '';
    if (id) {
        userId = id;
    } else {
        const steamUser = await getSteamUser(t);
        if (steamUser) {
            userId = steamUser.id;
        }
    }

    if (!userId) {
        return null; // TODO: Need better error-handling around this scenario
    }

    const url = `${serverURL}/games?id=${userId}`;

    return axios.get(url).then((response: {data: GameResponse}) => {
        const { games } = response.data.response;
        const sorted = games.sort(compare);

        // We can store 8192 characters worth of games, let's store 50
        return setSteamGameCache(t, sorted.slice(0, 49)).then(() => {
            return sorted;
        });
    }).catch((e) => {
        console.log('Error while getting owned Steam games', e);
        if (e && e.response && e.response.status && e.response.status === 401) {
            // This shouldn't happen, but we can make the user remove their auth and start over
            setSteamUser(t, undefined);
        }
    });
  };



