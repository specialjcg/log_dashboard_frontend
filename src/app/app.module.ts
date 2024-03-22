import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedBledModule} from "./shared-bled/shared-bled.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [

    SharedBledModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
