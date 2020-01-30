/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/auth.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auth.ts":
/*!*********************!*\
  !*** ./src/auth.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _trello_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trello-util */ \"./src/trello-util.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst t = TrelloPowerUp.iframe();\nfunction onAuthenticate() {\n    return Trello.authorize({\n        type: \"popup\",\n        name: \"Gaming Backlog\",\n        expiration: \"never\",\n        return_url: \"https://emgoto.github.io/gaming-backlog/\",\n        success: () => {\n            return Object(_trello_util__WEBPACK_IMPORTED_MODULE_0__[\"setToken\"])(t, Trello.token()).then(() => {\n                t.modal({\n                    url: './settings.html',\n                    height: 360,\n                    fullscreen: false,\n                    title: 'Gaming Backlog'\n                }).then(() => t.closePopup());\n            });\n        },\n        error: (e) => { console.log('Authentication error', e); },\n    });\n}\n;\nt.render(function () {\n    return __awaiter(this, void 0, void 0, function* () {\n        document.getElementById('authenticate-btn').onclick = onAuthenticate;\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0aC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXV0aC50cz9jMGJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldFRva2VuIH0gZnJvbSAnLi90cmVsbG8tdXRpbCc7XG5cbmRlY2xhcmUgY29uc3QgVHJlbGxvUG93ZXJVcDogYW55O1xuY29uc3QgdCA9IFRyZWxsb1Bvd2VyVXAuaWZyYW1lKCk7XG5kZWNsYXJlIGNvbnN0IFRyZWxsbzogYW55O1xuXG5mdW5jdGlvbiBvbkF1dGhlbnRpY2F0ZSgpIHtcbiAgcmV0dXJuIFRyZWxsby5hdXRob3JpemUoe1xuICAgIHR5cGU6IFwicG9wdXBcIixcbiAgICBuYW1lOiBcIkdhbWluZyBCYWNrbG9nXCIsXG4gICAgZXhwaXJhdGlvbjogXCJuZXZlclwiLFxuICAgIHJldHVybl91cmw6XCJodHRwczovL2VtZ290by5naXRodWIuaW8vZ2FtaW5nLWJhY2tsb2cvXCIsIFxuICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIHJldHVybiBzZXRUb2tlbih0LCBUcmVsbG8udG9rZW4oKSkudGhlbigoKSA9PiB7XG4gICAgICAgIHQubW9kYWwoe1xuICAgICAgICAgIHVybDogJy4vc2V0dGluZ3MuaHRtbCcsXG4gICAgICAgICAgaGVpZ2h0OiAzNjAsXG4gICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgdGl0bGU6ICdHYW1pbmcgQmFja2xvZydcbiAgICAgICAgfSkudGhlbigoKSA9PiB0LmNsb3NlUG9wdXAoKSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAoZSkgPT4geyBjb25zb2xlLmxvZygnQXV0aGVudGljYXRpb24gZXJyb3InLCBlKX0sXG4gIH0pO1xufTtcbiAgXG50LnJlbmRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhlbnRpY2F0ZS1idG4nKS5vbmNsaWNrID0gb25BdXRoZW50aWNhdGU7XG59KTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/auth.ts\n");

/***/ }),

/***/ "./src/trello-util.ts":
/*!****************************!*\
  !*** ./src/trello-util.ts ***!
  \****************************/
/*! exports provided: getToken, setToken, getSteamUser, setSteamUser, getSteamGameCache, setSteamGameCache, getLists, createCard, createCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getToken\", function() { return getToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setToken\", function() { return setToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSteamUser\", function() { return getSteamUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSteamUser\", function() { return setSteamUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSteamGameCache\", function() { return getSteamGameCache; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSteamGameCache\", function() { return setSteamGameCache; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLists\", function() { return getLists; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCard\", function() { return createCard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCards\", function() { return createCards; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst key = '783430b1c1096fa1119cfb1b69db7d50';\nconst getToken = (t) => t.get('member', 'private', 'authToken');\nconst setToken = (t, token) => t.set('member', 'private', 'authToken', token);\nconst getSteamUser = (t) => t.get('member', 'private', 'steamUser');\nconst setSteamUser = (t, steamUser) => t.set('member', 'private', 'steamUser', steamUser);\n// Board has a 8192 character limit so we can only store so many games in the cache\nconst getSteamGameCache = (t) => t.get('board', 'private', 'steamGameCache');\nconst setSteamGameCache = (t, lastStoredGames) => t.set('board', 'private', 'steamGameCache', lastStoredGames);\nconst getLists = (t) => __awaiter(void 0, void 0, void 0, function* () {\n    const token = yield getToken(t);\n    if (token === undefined) {\n        return;\n    }\n    const { board: boardId } = yield t.getContext();\n    const url = `https://api.trello.com/1/boards/${boardId}/lists&key=${key}&token=${token}`;\n    return axios.get(url).then(response => response.data).catch((e) => {\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            // Token no longer valid, delete\n            setToken(t, undefined);\n        }\n    });\n});\nconst createCard = (t, listId, game, token) => __awaiter(void 0, void 0, void 0, function* () {\n    const data = {\n        idList: listId,\n        key,\n        token,\n        name: game.name,\n        pos: 'bottom',\n        urlSource: `https://steamcdn-a.akamaihd.net/steam/apps/${game.id}/header.jpg`,\n    };\n    const url = `https://api.trello.com/1/cards`;\n    // TODO: Handling if Trello returns a 429 for too many requests\n    // 300 requests per 10 seconds for each API key\n    // 100 requests per 10 second interval for each token\n    return axios.post(url, data).then(response => response.data).catch((e) => {\n        console.log('Error creating card', e);\n        if (e && e.response && e.response.status && e.response.status === 401) {\n            // Token no longer valid, delete\n            setToken(t, undefined);\n        }\n    });\n});\nconst createCards = (t, listId, games) => __awaiter(void 0, void 0, void 0, function* () {\n    const token = yield getToken(t);\n    if (!token) {\n        return;\n    }\n    const cards = games.map(game => createCard(t, listId, game, token));\n    return axios.all(cards).then(axios.spread(function (acct, perms) {\n        return true;\n    }));\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHJlbGxvLXV0aWwudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3RyZWxsby11dGlsLnRzP2JhYjciXSwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBheGlvczogYW55O1xuXG5pbXBvcnQgeyBTdGVhbUdhbWUsIFN0ZWFtVXNlciB9IGZyb20gJy4vc3RlYW0tdXRpbCc7XG5cbmNvbnN0IGtleSA9ICc3ODM0MzBiMWMxMDk2ZmExMTE5Y2ZiMWI2OWRiN2Q1MCc7XG5cbnR5cGUgTGlzdCA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUb2tlbiA9ICh0KTogUHJvbWlzZTxzdHJpbmcgfCB2b2lkPiA9PiB0LmdldCgnbWVtYmVyJywgJ3ByaXZhdGUnLCAnYXV0aFRva2VuJyk7XG5leHBvcnQgY29uc3Qgc2V0VG9rZW4gPSAodCwgdG9rZW4pOiBQcm9taXNlPHZvaWQ+ID0+IHQuc2V0KCdtZW1iZXInLCAncHJpdmF0ZScsICdhdXRoVG9rZW4nLCB0b2tlbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTdGVhbVVzZXIgPSAodCk6IFByb21pc2U8U3RlYW1Vc2VyIHwgdm9pZD4gPT4gdC5nZXQoJ21lbWJlcicsICdwcml2YXRlJywgJ3N0ZWFtVXNlcicpO1xuZXhwb3J0IGNvbnN0IHNldFN0ZWFtVXNlciA9ICh0LCBzdGVhbVVzZXI6IFN0ZWFtVXNlcik6IFByb21pc2U8dm9pZD4gPT4gdC5zZXQoJ21lbWJlcicsICdwcml2YXRlJywgJ3N0ZWFtVXNlcicsIHN0ZWFtVXNlcik7XG5cbi8vIEJvYXJkIGhhcyBhIDgxOTIgY2hhcmFjdGVyIGxpbWl0IHNvIHdlIGNhbiBvbmx5IHN0b3JlIHNvIG1hbnkgZ2FtZXMgaW4gdGhlIGNhY2hlXG5leHBvcnQgY29uc3QgZ2V0U3RlYW1HYW1lQ2FjaGUgPSAodCk6IFByb21pc2U8U3RlYW1HYW1lW10gfCB2b2lkPiA9PiB0LmdldCgnYm9hcmQnLCAncHJpdmF0ZScsICdzdGVhbUdhbWVDYWNoZScpO1xuZXhwb3J0IGNvbnN0IHNldFN0ZWFtR2FtZUNhY2hlID0gKHQsIGxhc3RTdG9yZWRHYW1lczogU3RlYW1HYW1lW10pOiBQcm9taXNlPHZvaWQ+ID0+IHQuc2V0KCdib2FyZCcsICdwcml2YXRlJywgJ3N0ZWFtR2FtZUNhY2hlJywgbGFzdFN0b3JlZEdhbWVzKTtcblxuZXhwb3J0IGNvbnN0IGdldExpc3RzID0gYXN5bmMgKHQpOiBQcm9taXNlPExpc3RbXSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHQpO1xuICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGJvYXJkOiBib2FyZElkIH0gPSBhd2FpdCB0LmdldENvbnRleHQoKTtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkudHJlbGxvLmNvbS8xL2JvYXJkcy8ke2JvYXJkSWR9L2xpc3RzJmtleT0ke2tleX0mdG9rZW49JHt0b2tlbn1gO1xuICAgIHJldHVybiBheGlvcy5nZXQodXJsKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIGlmIChlICYmIGUucmVzcG9uc2UgJiYgZS5yZXNwb25zZS5zdGF0dXMgJiYgZS5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgLy8gVG9rZW4gbm8gbG9uZ2VyIHZhbGlkLCBkZWxldGVcbiAgICAgICAgICAgIHNldFRva2VuKHQsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhcmQgPSBhc3luYyAodDogYW55LCBsaXN0SWQ6IHN0cmluZywgZ2FtZTogU3RlYW1HYW1lLCB0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgaWRMaXN0OiBsaXN0SWQsXG4gICAgICAgIGtleSxcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG5hbWU6IGdhbWUubmFtZSxcbiAgICAgICAgcG9zOiAnYm90dG9tJyxcbiAgICAgICAgdXJsU291cmNlOiBgaHR0cHM6Ly9zdGVhbWNkbi1hLmFrYW1haWhkLm5ldC9zdGVhbS9hcHBzLyR7Z2FtZS5pZH0vaGVhZGVyLmpwZ2AsXG4gICAgfTtcblxuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS50cmVsbG8uY29tLzEvY2FyZHNgO1xuXG4gICAgLy8gVE9ETzogSGFuZGxpbmcgaWYgVHJlbGxvIHJldHVybnMgYSA0MjkgZm9yIHRvbyBtYW55IHJlcXVlc3RzXG4gICAgLy8gMzAwIHJlcXVlc3RzIHBlciAxMCBzZWNvbmRzIGZvciBlYWNoIEFQSSBrZXlcbiAgICAvLyAxMDAgcmVxdWVzdHMgcGVyIDEwIHNlY29uZCBpbnRlcnZhbCBmb3IgZWFjaCB0b2tlblxuICAgIHJldHVybiBheGlvcy5wb3N0KHVybCwgZGF0YSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY3JlYXRpbmcgY2FyZCcsIGUpO1xuICAgICAgICBpZiAoZSAmJiBlLnJlc3BvbnNlICYmIGUucmVzcG9uc2Uuc3RhdHVzICYmIGUucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgIC8vIFRva2VuIG5vIGxvbmdlciB2YWxpZCwgZGVsZXRlXG4gICAgICAgICAgICBzZXRUb2tlbih0LCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2FyZHMgPSBhc3luYyAodDogYW55LCBsaXN0SWQ6IHN0cmluZywgZ2FtZXM6IFN0ZWFtR2FtZVtdKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRUb2tlbih0KTtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjYXJkcyA9IGdhbWVzLm1hcChnYW1lID0+IFxuICAgICAgICBjcmVhdGVDYXJkKHQsIGxpc3RJZCwgZ2FtZSwgdG9rZW4pXG4gICAgKTtcblxuICAgIHJldHVybiBheGlvcy5hbGwoY2FyZHMpLnRoZW4oYXhpb3Muc3ByZWFkKGZ1bmN0aW9uIChhY2N0LCBwZXJtcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KSk7XG59OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBT0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/trello-util.ts\n");

/***/ })

/******/ });