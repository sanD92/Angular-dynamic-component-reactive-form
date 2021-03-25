import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponentComponent } from './message-component/message-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormComponent } from './dynamic-form/dynamic-form..component';
import { ReactiveFormsModule } from '@angular/forms';
import { DyanmicFormInputComponent } from './dynamic-form-component/dynamic-form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponentComponent,
    DynamicFormComponent,
    DyanmicFormInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageComponentComponent]
})
export class AppModule { }
