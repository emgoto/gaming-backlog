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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _trello_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trello-util */ \"./src/trello-util.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nwindow.Promise = TrelloPowerUp.Promise;\n\nTrelloPowerUp.initialize({\n    'board-buttons': function (t) {\n        return [{\n                text: 'Gaming Backlog',\n                icon: {\n                    dark: `${window.location}img/icon-light.svg`,\n                    light: `${window.location}img/icon-dark.svg`,\n                },\n                callback: (t) => __awaiter(this, void 0, void 0, function* () {\n                    const token = yield Object(_trello_util__WEBPACK_IMPORTED_MODULE_0__[\"getToken\"])(t);\n                    if (!token) {\n                        return t.popup({\n                            title: 'Gaming Backlog',\n                            url: './auth.html',\n                            height: 120,\n                        });\n                    }\n                    return t.modal({\n                        url: './settings.html',\n                        height: 360,\n                        fullscreen: false,\n                        title: 'Gaming Backlog'\n                    });\n                }),\n            }];\n    },\n    'authorization-status': function (t, options) {\n        return Object(_trello_util__WEBPACK_IMPORTED_MODULE_0__[\"getToken\"])(t)\n            .then(function (authToken) {\n            return { authorized: authToken != null };\n        });\n    },\n    'show-authorization': function (t, options) {\n        return t.popup({\n            title: 'Gaming Backlog',\n            url: './auth.html',\n            height: 100,\n        });\n    }\n    /**\n    'card-badges': function (t) {\n      // TODO: M2 Show current hours played\n      return []\n    },\n    'card-buttons': function (t) {\n      // TODO: M2 Allow users to generate achievements checklist\n      return [];\n    }\n     */\n}, {\n    appKey: '783430b1c1096fa1119cfb1b69db7d50',\n    appName: 'Gaming Backlog'\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LnRzP2M2YWUiXSwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBUcmVsbG9Qb3dlclVwOiBhbnk7XG53aW5kb3cuUHJvbWlzZSA9IFRyZWxsb1Bvd2VyVXAuUHJvbWlzZTtcblxuaW1wb3J0IHsgZ2V0VG9rZW4gfSBmcm9tICcuL3RyZWxsby11dGlsJztcblxuVHJlbGxvUG93ZXJVcC5pbml0aWFsaXplKHtcbiAgJ2JvYXJkLWJ1dHRvbnMnOiBmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiBbe1xuICAgICAgdGV4dDogJ0dhbWluZyBCYWNrbG9nJyxcbiAgICAgIGljb246IHtcbiAgICAgICAgZGFyazogYCR7d2luZG93LmxvY2F0aW9ufWltZy9pY29uLWxpZ2h0LnN2Z2AsXG4gICAgICAgIGxpZ2h0OiBgJHt3aW5kb3cubG9jYXRpb259aW1nL2ljb24tZGFyay5zdmdgLFxuICAgICAgfSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAodCkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHQpO1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgcmV0dXJuIHQucG9wdXAoe1xuICAgICAgICAgICAgdGl0bGU6ICdHYW1pbmcgQmFja2xvZycsXG4gICAgICAgICAgICB1cmw6ICcuL2F1dGguaHRtbCcsXG4gICAgICAgICAgICBoZWlnaHQ6IDEyMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0Lm1vZGFsKHtcbiAgICAgICAgICB1cmw6ICcuL3NldHRpbmdzLmh0bWwnLFxuICAgICAgICAgIGhlaWdodDogMzYwLFxuICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiAnR2FtaW5nIEJhY2tsb2cnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9XTtcbiAgfSxcbiAgJ2F1dGhvcml6YXRpb24tc3RhdHVzJzogZnVuY3Rpb24odCwgb3B0aW9ucyl7XG4gICAgcmV0dXJuIGdldFRva2VuKHQpXG4gICAgLnRoZW4oZnVuY3Rpb24oYXV0aFRva2VuKSB7XG4gICAgICByZXR1cm4geyBhdXRob3JpemVkOiBhdXRoVG9rZW4gIT0gbnVsbCB9XG4gICAgfSk7XG4gIH0sXG4gICdzaG93LWF1dGhvcml6YXRpb24nOiBmdW5jdGlvbih0LCBvcHRpb25zKXtcbiAgICByZXR1cm4gdC5wb3B1cCh7XG4gICAgICB0aXRsZTogJ0dhbWluZyBCYWNrbG9nJyxcbiAgICAgIHVybDogJy4vYXV0aC5odG1sJyxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgIH0pO1xuICB9ICBcbiAgLyoqXG4gICdjYXJkLWJhZGdlcyc6IGZ1bmN0aW9uICh0KSB7XG4gICAgLy8gVE9ETzogTTIgU2hvdyBjdXJyZW50IGhvdXJzIHBsYXllZFxuICAgIHJldHVybiBbXVxuICB9LFxuICAnY2FyZC1idXR0b25zJzogZnVuY3Rpb24gKHQpIHtcbiAgICAvLyBUT0RPOiBNMiBBbGxvdyB1c2VycyB0byBnZW5lcmF0ZSBhY2hpZXZlbWVudHMgY2hlY2tsaXN0XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gICAqL1xufSxcbiAge1xuICAgIGFwcEtleTogJzc4MzQzMGIxYzEwOTZmYTExMTljZmIxYjY5ZGI3ZDUwJyxcbiAgICBhcHBOYW1lOiAnR2FtaW5nIEJhY2tsb2cnXG4gIH0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

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