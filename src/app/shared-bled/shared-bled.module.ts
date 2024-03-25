import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LogComponent} from "../log/log.component";
import {BrowserModule} from "@angular/platform-browser";
import {GetLogService} from "../../service/get-log.service";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [LogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,


  ], exports: [
    LogComponent
  ],
  providers: [GetLogService,DatePipe]
})
export class SharedBledModule {
}
