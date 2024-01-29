"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comic_1 = __importDefault(require("../domain/comic"));
class ComicService {
    static createComic(data) {
        return new comic_1.default(data.comics.available, data.comics.collectionURI);
    }
}
exports.default = ComicService;
