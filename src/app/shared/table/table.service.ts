import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class TableService {

  constructor() {
  }

  initItems(data: any[], attributesArr: string[][]): any[] {
    const items = [];
    data.forEach(obj => {
      const item = {};
      attributesArr.forEach((attributes, i) => {
        let attValue = '';
        attributes.forEach(att => {
          attValue += _.get(obj, att) + ' ';
        });
        item[i] = attValue.trim();
      });
      items.push(item);
    });
    return items;
  }

  replaceColumnValues(data: any[], columnIndex: number, callback: ((oldValue: string) => string)) {
    data.forEach(obj => {
      obj[columnIndex] = callback(_.get(obj, columnIndex));
    });
  }
}
