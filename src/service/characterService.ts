import Character, {ICharacter} from "../domain/character";

export default class CharacterService {

    static createCharacter(data:Record<string, any>):ICharacter {
        const character:ICharacter = new Character(
            data.id,
            data.name,
            data.description,
            data.thumbnail
        );
        return character;
    }

    static createBulk(charactersList:Record<string, any>):ICharacter[] {
        const listToSave:ICharacter[] = [];
        charactersList.forEach( (character:Record<string, any>) => {
            listToSave.push(CharacterService.createCharacter(character));
        });
        
        return listToSave;
    }
}