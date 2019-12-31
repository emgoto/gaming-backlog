var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const key = '';
export const getToken = (t) => t.get('member', 'private', 'authToken');
export const setToken = (t, token) => t.set('member', 'private', 'authToken', token);
export const getFoo = (t) => __awaiter(void 0, void 0, void 0, function* () {
    const { card: cardId } = t.getContext();
    const token = yield getToken(t);
    const url = `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:idList,createCard&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
        if (e && e.response && e.response.status && e.response.status === 401) {
            // Token no longer valid, delete
            setToken(t, undefined);
        }
    });
});
//# sourceMappingURL=trello-util.js.map