import { Pipe, PipeTransform } from '@angular/core';
import { IHashMap } from '../imodels/ihashmap';

@Pipe({ name: 'hashtoarray' })
export class HashToArrayPipe implements PipeTransform {
    transform(elements: IHashMap) {
        if (!elements)
            return [];
        let arrayElem = new Array();
        for (let key in elements) {
            let element = new Element();
            element.id = key;
            element.value = elements[key];
            arrayElem.push(element);
        }
        return arrayElem;
    }
}

class Element {
    id: string;
    value: string;
}