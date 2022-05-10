import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'hideDisplayable'
})
export class HideDisplayablePipe implements PipeTransform {

  transform(value: any[] | null, propertyPath = 'status.displayable'): any[] {
    if(!value){
      return [];
    } else {
      return value.filter(item => _.get(item, propertyPath, true));
    }
  }

}
