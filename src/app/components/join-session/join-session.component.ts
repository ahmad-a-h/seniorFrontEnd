import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/backend-api.service';



@Component({
  selector: 'join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.css']
})
export class JoinSessionComponent implements OnInit {
  dataFromService: any;
  arr:any
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;
  video: HTMLVideoElement;
  videoFlag: boolean= true
  
  // cv: any;

  constructor(private service: BackendApiService, private router: Router) { }

  ngOnInit() {
    this.getDataFromService()
    console.log(this.dataFromService)
  }
  async ngAfterViewInit() {
    this.startVideo();
    'assets/opencv/data/haarcascades/haarcascade_frontalface_default.xml'
      this.video = this.videoElement.nativeElement;
      // cv = await loadOpenCv          
      this.video.play();
    
  }

  
  getDataFromService() {
    this.dataFromService = this.service.getData()
    this.dataFromService? this.arr = this.dataFromService.students : this.router.navigate(["session"])
    console.log(this.dataFromService)
  }
  formatDateTime(dateTime): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const formattedDateTime = new Date(dateTime).toLocaleString(undefined, options);
    return formattedDateTime;
  }
  startVideo(): void {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(error => {
          console.error('Error accessing the camera:', error);
        });
    }
  }

  stopVideo(): void {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    this.videoFlag = false
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
  }
}
