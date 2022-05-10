import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayOrderSort'
})
export class DisplayOrderSortPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((a,b) => {
      if(a.value.displayOrder !== b.value.displayOrder){
        return a.value.displayOrder > b.value.displayOrder ? 1 : -1
      } else {
        return a.value.name.localeCompare(b.name);
      }
    });
  }
}
