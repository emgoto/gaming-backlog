import { setToken } from './trello-util';

declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();
declare const Trello: any;

function onAuthenticate() {
  return Trello.authorize({
    type: "popup",
    name: "Gaming Backlog",
    expiration: "never",
    return_url:"https://emgoto.github.io/gaming-backlog/", 
    success: () => {
      setToken(t, Trello.token());
    },
    error: () => { },
  });
};
  
t.render(async function () {
    document.getElementById('authenticate-btn').onclick = onAuthenticate;
});