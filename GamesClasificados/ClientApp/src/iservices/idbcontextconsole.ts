import { Console } from '../models/console';
import { IHashMap } from '../imodels/ihashmap';

export interface IDbContextConsole {
    getConsoles(): Promise<IHashMap>;
}