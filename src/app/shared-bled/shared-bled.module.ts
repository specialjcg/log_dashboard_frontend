import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LogComponent} from "../log/log.component";
import {BrowserModule} from "@angular/platform-browser";
import {GetLogService} from "../../service/get-log.service";

@NgModule({
  declarations: [LogComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule


    ], exports: [
    LogComponent
  ],
  providers: [GetLogService]
})
export class SharedBledModule {
}
