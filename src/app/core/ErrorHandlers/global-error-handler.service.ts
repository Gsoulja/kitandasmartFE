import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(
    private zone: NgZone,
  ) {}

  handleError(error: Error | HttpErrorResponse): void {
    // Run error handling inside NgZone to ensure UI updates
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        // Handle HTTP errors
        this.handleHttpError(error);
      } else {
        // Handle runtime errors
        this.handleRuntimeError(error);
      }
    });
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'An error occurred';

    // Client-side errors
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    }
    // Server-side errors
    else {
      switch (error.status) {
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 403:
          errorMessage = 'Access denied';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = `Server Error: ${error.message}`;
      }
    }

    //this.logError('HTTP Error', errorMessage, error);
   console.log(errorMessage);
  }

  private handleRuntimeError(error: Error): void {
    const errorMessage = `Runtime Error: ${error.message}`;
    //this.logError('Runtime Error', errorMessage, error);
    console.log(errorMessage);
  }


  //Todo create a service to send the log to the backend
  /*private logError(type: string, message: string, error: any): void {
    // Log error details
    this.loggingService.logError({
      type,
      message,
      timestamp: new Date().toISOString(),
      stack: error.stack || 'No stack trace',
      url: window.location.href,
      userId: 'Get from your auth service'
    });
  }*/

}
