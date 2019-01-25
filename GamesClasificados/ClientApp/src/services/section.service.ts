import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { IHashMap } from '../imodels/ihashmap';
import { IDbContextSection } from '../iservices/idbcontextsection';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SectionService implements IDbContextSection {

    public static sections: IHashMap;

    constructor(private http: HttpClient) { }

    getSections(): Promise<IHashMap> {
        if (SectionService.sections) {
            return new Promise((resolve, reject) => { resolve(SectionService.sections) });
        }
        return new Promise((resolve, reject) => {
            this.http.get<Section[]>('api/Sections').subscribe(
                value => {
                    SectionService.sections = {};
                    for (let i = 0; i < value.length; i++) {
                        SectionService.sections[value[i].id] = value[i].name;
                    }
                    resolve(SectionService.sections);
                },
                error => console.log(JSON.stringify(error))
            )
        });
    }
}