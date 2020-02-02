declare const TrelloPowerUp: any;
window.Promise = TrelloPowerUp.Promise;

import { getToken } from './trello-util';

TrelloPowerUp.initialize({
  'board-buttons': function (t) {
    return [{
      text: 'Gaming Backlog',
      icon: {
        dark: `${window.location}img/icon-light.svg`,
        light: `${window.location}img/icon-dark.svg`,
      },
      callback: async (t) => {
        const token = await getToken(t);
        if (!token) {
          return t.popup({
            title: 'Gaming Backlog',
            url: './auth.html',
            height: 120,
          });
        }

        return t.modal({
          url: './settings.html',
          height: 360,
          fullscreen: false,
          title: 'Gaming Backlog'
        });
      },
    }];
  },
  'authorization-status': function(t, options){
    return getToken(t)
    .then(function(authToken) {
      return { authorized: authToken != null }
    });
  },
  'show-authorization': function(t, options){
    return t.popup({
      title: 'Gaming Backlog',
      url: './auth.html',
      height: 100,
    });
  }  
  /**
  'card-badges': function (t) {
    // TODO: M2 Show current hours played
    return []
  },
  'card-buttons': function (t) {
    // TODO: M2 Allow users to generate achievements checklist
    return [];
  }
   */
},
  {
    appKey: '783430b1c1096fa1119cfb1b69db7d50',
    appName: 'Gaming Backlog'
  });
