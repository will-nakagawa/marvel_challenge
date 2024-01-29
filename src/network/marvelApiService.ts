import { md5 } from '../utils/utils';

const baseUrl = process.env.MARVEL_BASE_URL;

const timestamp:string = "1";
const params:Record<string, any> = {
    hash: md5(`${timestamp}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`),
    ts: timestamp,
    apikey: process.env.MARVEL_PUBLIC_KEY,
};

const getCharacterList = async (name:string | null = null, comics:string | null = null, limit: number | null = 100) => {
    const localParams = {...params};
    
    if(name) {
        localParams.name = name;
    }

    if(comics) {
        localParams.comics = comics;
    }

    localParams.limit = limit;

    const urlParams:URLSearchParams = new URLSearchParams(localParams);

    try {
        const response: Response = await fetch(`${baseUrl}/characters?${urlParams.toString()}`);
        const body:Promise<any> = await response.json();
        return body;
    } catch(err) {
        console.error(err);
    }
};

const getCharacterComicList = async (characterId:string, limit:number = 100, offset:number = 0) => { 
    
    const localParams = {...params};
    localParams.offset = 0;
    localParams.limit = limit;

    const urlParams:URLSearchParams = new URLSearchParams(localParams);

    try {
        const response: Response = await fetch(`${baseUrl}/characters/${characterId}/comics?${urlParams.toString()}`);
        const body:Promise<any> = await response.json();
        return body;
    } catch(err) {
        console.error(err);
    }

};

export {getCharacterList, getCharacterComicList};