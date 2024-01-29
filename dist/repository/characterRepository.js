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
const db_1 = __importDefault(require("../database/db"));
const TABLE_NAME = "characters";
class CharacterRepository {
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield (0, db_1.default)(TABLE_NAME).where({ name }).first();
            return character;
        });
    }
    save(character) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.default)(TABLE_NAME).insert(character).onConflict('id').merge();
            return character;
        });
    }
    saveAll(characters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.default)(TABLE_NAME).insert(characters).onConflict('id').merge();
            return characters;
        });
    }
}
exports.default = CharacterRepository;
