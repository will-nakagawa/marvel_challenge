"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Character {
    constructor(id, name, description, thumbnail) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.picture = `${thumbnail.path}.${thumbnail.extension}`;
    }
    getId() {
        return this.id;
    }
}
exports.default = Character;
