import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {AuthServiceService} from '../auth/services/auth-service.service';
import {ImageUploadService} from './services/image-upload.service';

@Component({
  selector: 'app-take-photo',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './take-photo.component.html',
  styleUrl: './take-photo.component.scss'
})
export class TakePhotoComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  ngAfterViewInit() {
    this.startCamera();
  }
  constructor(private imageUploadService: ImageUploadService) {}
  startCamera() {
    // Try to access the back camera, fallback to front if unavailable
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: 'environment' } } // First try the back camera
      })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Back camera not available, trying front camera:', err);

        // If the back camera isn't available, fallback to the front camera
        navigator.mediaDevices
          .getUserMedia({
            video: true // Fallback to front camera
          })
          .then((stream) => {
            this.videoElement.nativeElement.srcObject = stream;
          })
          .catch((err) => {
            console.error('No camera available:', err);
          });
      });
  }

  takePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to Blob
    canvas.toBlob((blob: BlobPart) => {
      if (blob) {
        const file = new File([blob], 'captured-image.png', { type: 'image/png' });

        // Send image to backend
        this.imageUploadService.uploadImage(file).subscribe(
          (response) => console.log('Image uploaded successfully:', response),
          (error) => console.error('Error uploading image:', error)
        );
      }
    }, 'image/png');
  }

}
