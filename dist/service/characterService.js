"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const character_1 = __importDefault(require("../domain/character"));
class CharacterService {
    static createCharacter(data) {
        const character = new character_1.default(data.id, data.name, data.description, data.thumbnail);
        return character;
    }
    static createBulk(charactersList) {
        const listToSave = [];
        charactersList.forEach((character) => {
            listToSave.push(CharacterService.createCharacter(character));
        });
        return listToSave;
    }
}
exports.default = CharacterService;
