import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/http/backend-api.service';
import Swal from 'sweetalert2';


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
  studentImg: string;
  dataForPython: {};
  arrDataAttended:any
  // cv: any;

  constructor(private service: BackendApiService, private router: Router) { }

  ngOnInit() {
    this.getDataFromService()
    console.log(this.dataFromService)
    this.getDataAttended()
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

  capture(): void {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64DataUrl = canvas.toDataURL("image/jpeg", 1.0);
  // this.studentImg = base64DataUrl;
  console.log(base64DataUrl)
    
  this.dataForPython = {
    'image1_base64':base64DataUrl,
    'arrStudent': this.dataFromService.course.students,
    'sessionId' : this.dataFromService.id
  }

  this.service.postImgPython(this.dataForPython).subscribe((Response:any)=>{
    Swal.fire({
      icon: 'success',
      position: 'top-end',
      text: `${Response.student.fName} ${Response.student.id} Joined The Session!`,
      showConfirmButton: false,
      timer: 1500
    })
    this.getDataAttended()
  })
  }
  getDataAttended(){
    this.service.get('getStudentsAttendenceBySessionId'+this.dataFromService.id).subscribe((Response)=>{
      this.arrDataAttended = Response.body
      console.log(this.arrDataAttended)
    })
  }
}
