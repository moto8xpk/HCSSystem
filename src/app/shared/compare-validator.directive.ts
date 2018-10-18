import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { $$ } from 'protractor';

@Directive({
  selector: '[compare]',
  providers: [{provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true}]
})
export class CompareValidatorDirective implements Validator {
  @Input('compare') controlNameToCompare: string;

  constructor() { }

  validate(c: AbstractControl) : ValidationErrors | null {
    if(c.value === null) {
      return null; // do not validate empty value
    }
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if(controlToCompare) {
      const subcription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subcription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? {'compare': true} : null;
  }
}
