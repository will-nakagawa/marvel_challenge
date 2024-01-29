"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comic {
    constructor(available, collectionURI) {
        this.available = available;
        this.collectionURI = collectionURI;
    }
    getAvailable() {
        return this.available;
    }
}
exports.default = Comic;
