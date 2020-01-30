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
      return t.closePopup().then(() => {
        return t.modal({
          url: './settings.html',
          height: 360,
          fullscreen: false,
          title: 'Gaming Backlog'
        });
      })
    },
    error: () => { },
  });
};
  
t.render(async function () {
    document.getElementById('authenticate-btn').onclick = onAuthenticate;
});