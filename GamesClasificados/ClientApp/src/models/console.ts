import { IHashMap } from '../imodels/ihashmap';

export class Console {
    id: number;
    name: string;

    constructor (id = 0, name = '') {
        this.id = id;
        this.name = name;
    }
    
    public static getConsoleFromObject(object: any): Console {
        let console: Console = new Console(object.id, object.name);
        return console;
    }

}