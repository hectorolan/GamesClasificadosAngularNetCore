import { Injectable } from '@angular/core';
import { Console } from '../models/console';
import { IHashMap } from '../imodels/ihashmap';
import { IDbContextConsole } from '../iservices/idbcontextconsole';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConsoleService implements IDbContextConsole {

    public static consoles: IHashMap;

    constructor(private http: HttpClient) { }

    getConsoles(): Promise<IHashMap> {
        if (ConsoleService.consoles) {
            return new Promise((resolve, reject) => { resolve(ConsoleService.consoles) });
        }
        return new Promise((resolve, reject) => {
            this.http.get<Console[]>('api/SystemConsoles').subscribe(
                value => {
                    ConsoleService.consoles = {};
                    for (let i = 0; i < value.length; i++) {
                        ConsoleService.consoles[value[i].id] = value[i].name;
                    }
                    resolve(ConsoleService.consoles);
                },
                error => console.log(JSON.stringify(error))
            )
        });
    }
}