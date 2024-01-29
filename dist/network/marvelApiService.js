"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterComicList = exports.getCharacterList = void 0;
const utils_1 = require("../utils/utils");
const baseUrl = process.env.MARVEL_BASE_URL;
const timestamp = "1";
const params = {
    hash: (0, utils_1.md5)(`${timestamp}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`),
    ts: timestamp,
    apikey: process.env.MARVEL_PUBLIC_KEY,
};
const getCharacterList = (name = null, comics = null, limit = 100) => __awaiter(void 0, void 0, void 0, function* () {
    const localParams = Object.assign({}, params);
    if (name) {
        localParams.name = name;
    }
    if (comics) {
        localParams.comics = comics;
    }
    localParams.limit = limit;
    const urlParams = new URLSearchParams(localParams);
    try {
        const response = yield fetch(`${baseUrl}/characters?${urlParams.toString()}`);
        const body = yield response.json();
        return body;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getCharacterList = getCharacterList;
const getCharacterComicList = (characterId, limit = 100, offset = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const localParams = Object.assign({}, params);
    localParams.offset = 0;
    localParams.limit = limit;
    const urlParams = new URLSearchParams(localParams);
    try {
        const response = yield fetch(`${baseUrl}/characters/${characterId}/comics?${urlParams.toString()}`);
        const body = yield response.json();
        return body;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getCharacterComicList = getCharacterComicList;
