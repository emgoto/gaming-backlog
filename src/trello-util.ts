declare const axios: any;

import { SteamGame, SteamUser } from './steam-util';

const key = '783430b1c1096fa1119cfb1b69db7d50';

type List = {
    id: string;
    name: string;
};

export const getToken = (t): Promise<string | void> => t.get('member', 'private', 'authToken');
export const setToken = (t, token): Promise<void> => t.set('member', 'private', 'authToken', token);

export const getSteamUser = (t): Promise<SteamUser | void> => t.get('member', 'private', 'steamUser');
export const setSteamUser = (t, steamUser: SteamUser): Promise<void> => t.set('member', 'private', 'steamUser', steamUser);

// Board has a 8192 character limit so we can only store so many games in the cache
export const getSteamGameCache = (t): Promise<SteamGame[] | void> => t.get('board', 'private', 'steamGameCache');
export const setSteamGameCache = (t, lastStoredGames: SteamGame[]): Promise<void> => t.set('board', 'private', 'steamGameCache', lastStoredGames);

export const getLists = async (t): Promise<List[] | void> => {
    const token = await getToken(t);
    if (token === undefined) {
        return;
    }

    const { board: boardId } = await t.getContext();
    const url = `https://api.trello.com/1/boards/${boardId}/lists&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
        if (e && e.response && e.response.status && e.response.status === 401) {
            // Token no longer valid, delete
            setToken(t, undefined);
        }
    });
  };

export const createCard = async (t: any, listId: string, game: SteamGame, token: string): Promise<void> => {
    const data = {
        idList: listId,
        key,
        token,
        name: game.name,
        pos: 'bottom',
        urlSource: `https://steamcdn-a.akamaihd.net/steam/apps/${game.id}/header.jpg`,
    };

    const url = `https://api.trello.com/1/cards`;

    // TODO: Handling if Trello returns a 429 for too many requests
    // 300 requests per 10 seconds for each API key
    // 100 requests per 10 second interval for each token
    return axios.post(url, data).then(response => response.data).catch((e) => {
        console.log('Error creating card', e);
        if (e && e.response && e.response.status && e.response.status === 401) {
            // Token no longer valid, delete
            setToken(t, undefined);
        }
    });
};

export const createCards = async (t: any, listId: string, games: SteamGame[]): Promise<void> => {
    const token = await getToken(t);
    if (!token) {
        return;
    }

    const cards = games.map(game => 
        createCard(t, listId, game, token)
    );

    return axios.all(cards).then(axios.spread(function (acct, perms) {
        return true;
    }));
};