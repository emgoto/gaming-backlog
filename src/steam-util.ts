declare const axios: any;

import { getSteamUser, setSteamGameCache } from './trello-util';

const serverURL = 'https://trello-game-backlog.herokuapp.com';

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
            // If we're returning 401, it means the profile is private.
        } else if (e && !e.response) {
            console.log('server is down');
            //TODO: error handling for if server is down
        }
    });
  };

export const getGame = async (id: string): Promise<string | null | void> => {
    const url = `${serverURL}/game?id=${id}`

    return axios.get(url).then((response: { data: {response: string | null}}) => {
        return response.data.response;
    }).catch(e => {
        if (e && e.response && e.response.status && e.response.status === 404) {
            return undefined;
        }
    });
};

export const getAppId = (url: string): string | void => {
    const numbersOnly = new RegExp('^[0-9]+$');
    const numbersResult = numbersOnly.exec(url);

    if (numbersResult) {
    return numbersResult[0]
    }

    const regex = new RegExp('app\/([0-9]+)');
    const urlResult = regex.exec(url);

    if (!urlResult || urlResult && urlResult.length !== 2) {
        return undefined;
    }

    return urlResult[1];
}



