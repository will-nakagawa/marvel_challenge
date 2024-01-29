import knex from "../database/db";
import {ICharacter} from "../domain/character";

const TABLE_NAME = "characters";

export default class CharacterRepository {
  async findByName(name: string): Promise<ICharacter | undefined> {
    const character = await knex<ICharacter>(TABLE_NAME).where({ name }).first();
    return character;
  }

  async save(character: ICharacter): Promise<ICharacter> {
    await knex<ICharacter>(TABLE_NAME).insert(character).onConflict('id').merge();
    return character;
  }

  async saveAll(characters: ICharacter[]):  Promise<ICharacter[]> {
    await knex<ICharacter[]>(TABLE_NAME).insert(characters).onConflict('id').merge();
    return characters;
  }

}