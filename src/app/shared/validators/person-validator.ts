import {AbstractControl, FormArray, ValidationErrors, Validators} from "@angular/forms";

export function uniquePersonValidator(control: AbstractControl): ValidationErrors | null {
    const associatedPerson = control as FormArray;
    const personNames = associatedPerson.controls.map(person => person.get('personName')?.value);
    const hasDuplicates = personNames.some((name, index) => personNames.indexOf(name) !== index);

    return hasDuplicates ? { 'personExists': true } : null;
}
