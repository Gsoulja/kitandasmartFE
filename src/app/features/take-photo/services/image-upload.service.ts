import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private uploadUrl = 'http://backendapp.kitandasmart.com/api/upload'; // Spring Boot API URL

  constructor(private http: HttpClient) {}

  // Function to upload the image
  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);

    // Sending the form data to the Spring Boot backend using POST
    return this.http.post<any>(this.uploadUrl, formData, {
      headers: new HttpHeaders(),
    });
  }
}
