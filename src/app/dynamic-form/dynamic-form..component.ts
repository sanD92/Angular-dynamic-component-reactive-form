import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormFieldControlService } from "../data-service/form-field-control.service";
import { FormField } from "../model/form-field";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    @Input() formFields: FormField<string>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(private formFieldService: FormFieldControlService) {
        console.log('formFields DynamicFormComponent', this.formFields);
        console.log('form DynamicFormComponent', this.form);
    }

    ngOnInit(): void {
        this.form = this.formFieldService.toFormGroup(this.formFields);
        console.log('form DynamicFormComponent oninit', this.form);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.getRawValue());
    }
}