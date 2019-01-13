import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    value = value.replace(/[^a-zA-Z1-9 ]/g, '');
    value = value.toLowerCase();
    value = value.replace(/\b(\w)/g, (c) => c.toUpperCase());
    return value;
  }

}
