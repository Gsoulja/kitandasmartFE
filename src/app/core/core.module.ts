import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlobalErrorHandlerService} from './ErrorHandlers/global-error-handler.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService}
  ]
})
export class CoreModule { }
