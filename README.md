# TypeScript Trello Power-Up Starter
Get started with creating Trello Power-Ups using TypeScript.

Remember to run `npm install`!

## Testing the power-up locally with Jekyll and ngrok
Github pages uses Jekyll so you'll need to do a few things to test this locally:

```
gem install github-pages
jekyll serve
./ngrok http 4000 #in another terminal window
```
[See a full explanation here](https://www.emgoto.com/testing-trello-power-ups-on-github-pages/)

Also run `npm run build -- --watch` in another tab to watch your .js changes.

## Pushing your changes
Make sure to run `npm run build` before pushing changes. This will use the settings in `webpack.config.js` and put your js files into the `docs/js` folder.

We store our code in `/docs` instead of `/public` as this is a limitation of the way Github Pages works.

## Publishing this Power_up
This Power-Up's docs folder is published using Github Pages and can be accessed from this URL: https://emgoto.github.io/trello-sla/ You'll need to put that link in your Trello Power-ups admin page.

## Tests
`npm test`
