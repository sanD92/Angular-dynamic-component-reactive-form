import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { FormFieldControlService } from './data-service/form-field-control.service';
import { MessageComponentComponent } from './message-component/message-component.component';
import { FormField } from './model/form-field';
import { UserInformationComponent } from './user-info/user-info.component';
import { PaymentComponent } from './user-payment/payment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'san-dynamic-component load';
  formFieldsObejct;
  // componentRef: any;
  // @ViewChild('messageconatiner', { read: ViewContainerRef }) _messageconatiner?: ViewContainerRef;
  formFields: Observable<FormField<any>[]>;
  public dynamicTabs = [
    {
      label: 'User Information',
      component: UserInformationComponent
    },
    {
      label: 'Payment',
      component: PaymentComponent
    }
  ];
  constructor(private resolver: ComponentFactoryResolver, formFieldService: FormFieldControlService) {
    this.formFields = formFieldService.getFormFields();
    this.formFields.subscribe((data) => {
      console.log('formFields', data);
      this.formFieldsObejct = data;
    });

  }

  // createCompnent(msg: string) {
  //   this._messageconatiner?.clear();
  //   const factory = this.resolver.resolveComponentFactory(MessageComponentComponent);
  //   this.componentRef = this._messageconatiner?.createComponent(factory);
  //   this.componentRef.instance.msg = msg;
  // }

  // welcomeFn(_msg: string) {
  //   this.createCompnent(_msg);
  // }

  // notWelcomeFn(_msg: string) {
  //   this.componentRef.destroy();
  // }

  ngOnInit() {

    // create observble

    const observable1 = Observable.create(function subscribe(observer: any) {
      try {
        observer.next('Hey guys');
        observer.next('How are you');
        observer.complete();
        observer.next('This will not send');
      } catch (err) {
        observer.error(err);
      }

    });

    observable1.subscribe((x: any) => {
      // console.log('%cvvvv', 'color:blue', x);
      this.addItem(x);
    }, (error: any) => this.addItem(error), () => this.addItem('complete'));
  }

  addItem(val: any) {
    const node = document.createElement('li');
    let textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById("output").appendChild(node);
  }

  // hot or cold observable
  // share() operator creates hot observable

  // subject - different type of observable, have speacial capcity
  // subject
  // behaviourSubject
  // replaySubject

  // RxJs Operator 

  // Callbacks vs Promises vs RxJs Observables vs async/ await
  // https://www.youtube.com/watch?v=jgWnccjXR4I


}
