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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCollectingData = void 0;
const marvelApiService_1 = require("../network/marvelApiService");
const characterService_1 = __importDefault(require("../service/characterService"));
const comicService_1 = __importDefault(require("./comicService"));
const characterRepository_1 = __importDefault(require("../repository/characterRepository"));
const utils_1 = require("../utils/utils");
const characterRepository = new characterRepository_1.default();
const startCollectingData = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.logger)("info", "Stating exfiltrate data collect");
    (0, utils_1.logger)("info", "\t1 - Collecting Spectrum information...");
    const spectrumResult = yield collectSpectrumData();
    yield characterRepository.save(spectrumResult.spectrum);
    (0, utils_1.logger)("info", "\t-- Spectrum information collected successfully!");
    const characters = yield collectCharactersFromCommics(spectrumResult.spectrum, spectrumResult.data);
    characterRepository.saveAll(characters);
    (0, utils_1.logger)("info", `Found ${characters.length} other characters in comics`);
    (0, utils_1.logger)("info", "Other Character information collected successfully!");
    (0, utils_1.logger)("success", "Exfiltrate data finished!");
});
exports.startCollectingData = startCollectingData;
const collectSpectrumData = () => __awaiter(void 0, void 0, void 0, function* () {
    const spectrumData = yield (0, marvelApiService_1.getCharacterList)("Spectrum");
    const spectrumResult = spectrumData.data.results[0];
    const spectrum = characterService_1.default.createCharacter(spectrumResult);
    return { spectrum, data: spectrumResult };
});
const collectCharactersFromCommics = (spectrum, spectrumResult) => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.logger)("info", "\t2 - Collecting other Character from comics information...");
    const spectrumComic = comicService_1.default.createComic(spectrumResult);
    const data = yield (0, marvelApiService_1.getCharacterComicList)(spectrum.id, spectrumComic.getAvailable());
    const comicsList = data.data.results;
    const comicIdList = [];
    let comicIdSubList = [];
    let startFrom = 0;
    let endFrom = 9;
    comicsList.forEach((comic, index) => {
        comicIdSubList.push(comic.id);
        if (comicIdSubList.length === 10 && endFrom === index) {
            comicIdList.push(comicIdSubList);
            comicIdSubList = [];
            startFrom = comicIdList.length - index;
            endFrom += 10;
        }
    });
    if (startFrom < comicIdList.length) {
        comicIdList.push(comicIdSubList);
    }
    const resultList = yield fetchCharacterFromComicList(comicIdList);
    const characters = characterService_1.default.createBulk(resultList);
    return characters;
});
const fetchCharacterFromComicList = (comicIdList) => __awaiter(void 0, void 0, void 0, function* () {
    let resultList = [];
    const resultMap = new Map();
    for (const slice of comicIdList) {
        const characterListData = yield (0, marvelApiService_1.getCharacterList)(null, slice.join(", "));
        const characterListResult = characterListData.data.results;
        resultList = resultList.concat(characterListResult);
    }
    resultList.forEach(res => {
        resultMap.set(res.id, res);
    });
    // remove spectrum from character list 
    resultMap.delete(1010705);
    return Array.from(resultMap.values());
});
