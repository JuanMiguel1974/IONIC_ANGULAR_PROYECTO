import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailDirective]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailDirective,
    multi: true}]
})
export class EmailDirective {

  constructor() { }

  validate( input: AbstractControl): { [key: string]: any} | null{

    if(input.value){
      if (!/^.+@.+\..+/.test(input.value)){
        return { appEmailDirective: true };
      }
    }
    return null;
  }

}
