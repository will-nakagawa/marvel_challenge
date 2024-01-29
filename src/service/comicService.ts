import Comic from '../domain/comic';

export default class ComicService {

    static createComic(data:Record<string, any>):Comic {
        return new Comic(
            data.comics.available,
            data.comics.collectionURI
        );
    }
}