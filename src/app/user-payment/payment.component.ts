import { Component } from "@angular/core";

@Component({
    selector: 'app-user-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
    constructor() {
        console.log('payment component');
    }
}