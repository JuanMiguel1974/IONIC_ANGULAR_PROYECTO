import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoPipe'
})
export class ProductoPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
