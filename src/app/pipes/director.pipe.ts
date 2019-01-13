import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'director'
})
export class DirectorPipe implements PipeTransform { 
  transform(value: any, args?: any): any {
    value = value.replace(/[^a-zA-Z ]/g, '');
    value = value.replace(/\b(\w)/g, (c) => c.toUpperCase());
    return value;
  }

}
