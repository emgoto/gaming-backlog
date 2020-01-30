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
    success: (t2) => {
      console.log('on success?', t);
      console.log('t2', t2);
      setToken(t, Trello.token());
      return t.closePopup().then(() => {
        console.log('then...');
        return t.modal({
          url: './settings.html',
          height: 360,
          fullscreen: false,
          title: 'Gaming Backlog'
        });
      }).catch(e => {
        console.log('caught error', e);
      })
    },
    error: () => { },
  });
};
  
t.render(async function () {
    document.getElementById('authenticate-btn').onclick = onAuthenticate;
});