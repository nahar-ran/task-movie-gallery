import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: any, arg1: any, arg2: any): any {
    if (value.length > arg1) {
      value = value.substring(0, arg2) + '...';
    }
    return value;
  }

}
