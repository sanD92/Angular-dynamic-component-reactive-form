import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormField } from "../model/form-field";
@Component({
    selector: 'app-dynamic-form-input',
    templateUrl: './dynamic-form-input.component.html',
    styleUrls: ['./dynamic-form-input.component.scss']
})
export class DyanmicFormInputComponent implements OnInit {
    @Input() input: FormField<string>;
    @Input() form: FormGroup;

    constructor() {
        console.log('input DyanmicFormInputComponent', this.input);
        console.log('form DyanmicFormInputComponent', this.form);
    }

    ngOnInit() {
        console.log('input DyanmicFormInputComponent', this.input);
        console.log('form DyanmicFormInputComponent', this.form);
    }

    get isValid() {
        return this.form.controls[this.input.key].valid;
    }
}