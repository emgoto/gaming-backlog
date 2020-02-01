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
    scope: "read,write",
    success: () => {
      return setToken(t, Trello.token()).then(() => {
        t.modal({
          url: './settings.html',
          height: 360,
          fullscreen: false,
          title: 'Gaming Backlog'
        }).then(() => t.closePopup());
      });
    },
    error: (e) => { console.log('Authentication error', e)},
  });
};
  
t.render(async function () {
    document.getElementById('authenticate-btn').onclick = onAuthenticate;
});