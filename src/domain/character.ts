class Character implements ICharacter {

    id:string;
    name:string;
    description:string;
    picture:string;

    constructor(id:string, name:string, description:string , thumbnail:Record<string, any>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.picture = `${thumbnail.path}.${thumbnail.extension}`;
    }

    getId():string {
        return this.id;
    }

}

export interface ICharacter {
    id:string;
    name:string;
    description:string;
    picture: string;
}

export default Character;