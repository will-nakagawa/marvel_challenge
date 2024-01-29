class Comic {
    
    private available: number;
    private collectionURI: string;
    
    constructor(available: number, collectionURI: string) {
        this.available = available;
        this.collectionURI = collectionURI;
    }

    getAvailable():number {
        return this.available;
    }

}

export default Comic;