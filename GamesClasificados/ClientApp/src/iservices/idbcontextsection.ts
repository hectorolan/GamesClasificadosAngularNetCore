import { Section } from '../models/section';
import { IHashMap } from '../imodels/ihashmap';

export interface IDbContextSection {
    getSections(): Promise<IHashMap>;
}