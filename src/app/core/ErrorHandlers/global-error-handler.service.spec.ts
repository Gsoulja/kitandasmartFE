import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandlerService, // Only provide the service under test
      ],
    });

    // Inject the service and NgZone
    service = TestBed.inject(GlobalErrorHandlerService);
    ngZone = TestBed.inject(NgZone); // NgZone is automatically available
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle HTTP errors (client-side) correctly', () => {
    spyOn(console, 'log'); // Use Jasmine's spyOn
    const mockError = new HttpErrorResponse({
      error: new ErrorEvent('Client Error', { message: 'Test client error' }),
      status: 0,
      statusText: 'Unknown Error',
    });

    service.handleError(mockError);

    expect(console.log).toHaveBeenCalledWith('Client Error: Test client error');
  });

  it('should handle HTTP errors (server-side - 404) correctly', () => {
    spyOn(console, 'log');
    const mockError = new HttpErrorResponse({
      error: 'Not Found',
      status: 404,
      statusText: 'Not Found',
    });

    service.handleError(mockError);

    expect(console.log).toHaveBeenCalledWith('Resource not found');
  });

  it('should handle HTTP errors (server-side - 500) correctly', () => {
    spyOn(console, 'log');
    const mockError = new HttpErrorResponse({
      error: 'Internal Server Error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    service.handleError(mockError);

    expect(console.log).toHaveBeenCalledWith('Internal server error');
  });

  it('should handle runtime errors correctly', () => {
    spyOn(console, 'log');
    const mockError = new Error('Test runtime error');

    service.handleError(mockError);

    expect(console.log).toHaveBeenCalledWith('Runtime Error: Test runtime error');
  });
});
