import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime'
})
export class RuntimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value + ' min';
  }

}
