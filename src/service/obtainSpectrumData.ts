import { getCharacterComicList, getCharacterList} from "../network/marvelApiService";
import CharacterService from "../service/characterService";
import ComicService from "./comicService";
import {ICharacter} from "../domain/character";
import Comic from "../domain/comic";
import CharacterRepository from "../repository/characterRepository";
import {logger} from "../utils/utils";

const characterRepository = new CharacterRepository();

const startCollectingData = async () => {
    logger("info", "Stating exfiltrate data collect");
    logger("info", "\t1 - Collecting Spectrum information...");

    const spectrumResult:Record<string, any> = await collectSpectrumData();

    await characterRepository.save(spectrumResult.spectrum);
    
    logger("info", "\t-- Spectrum information collected successfully!");

    const characters:ICharacter[] = await collectCharactersFromCommics(spectrumResult.spectrum, spectrumResult.data);

    characterRepository.saveAll(characters);

    logger("info", `Found ${characters.length} other characters in comics`);
    logger("info", "Other Character information collected successfully!");
    logger("success", "Exfiltrate data finished!");
};

const collectSpectrumData = async ():Promise<Record<string, any>> => {
    const spectrumData = await getCharacterList("Spectrum");
    const spectrumResult:Record<string, any> = spectrumData.data.results[0];
    const spectrum:ICharacter = CharacterService.createCharacter(spectrumResult);

    return {spectrum, data: spectrumResult};
};

const collectCharactersFromCommics = async (spectrum:ICharacter, spectrumResult:Record<string, any>) => {
    
    logger("info", "\t2 - Collecting other Character from comics information...");
    
    const spectrumComic:Comic = ComicService.createComic(spectrumResult);

    const data = await getCharacterComicList(spectrum.id, spectrumComic.getAvailable());
    const comicsList:Record<string, any> = data.data.results;

    const comicIdList:number[][] = [];

    let comicIdSubList:number[] = [];
    let startFrom = 0;
    let endFrom = 9;

    comicsList.forEach( (comic:Record<string, any>, index:number) => {
        comicIdSubList.push(comic.id);   
        if(comicIdSubList.length === 10 && endFrom === index) {
            comicIdList.push(comicIdSubList);
            comicIdSubList = [];
            startFrom = comicIdList.length - index;
            endFrom += 10;
        }
    });

    if(startFrom < comicIdList.length) {
        comicIdList.push(comicIdSubList);
    }

    const resultList = await fetchCharacterFromComicList(comicIdList);

    const characters:ICharacter[] = CharacterService.createBulk(resultList);

    return characters;
};

const fetchCharacterFromComicList = async (comicIdList:number[][]) => {
    let resultList:Record<string, any>[] = [];
    const resultMap = new Map();

    for( const slice of comicIdList) {
        const characterListData = await getCharacterList(null, slice.join(", "));
        const characterListResult = characterListData.data.results;
        resultList = resultList.concat(characterListResult);
    }

    resultList.forEach( res => {
        resultMap.set(res.id, res);
    });

    // remove spectrum from character list 
    resultMap.delete(1010705);

    return Array.from(resultMap.values());
};

export {startCollectingData};