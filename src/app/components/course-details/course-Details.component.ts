import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/http/backend-api.service';

@Component({
  selector: 'app-session-view',
  templateUrl: './course-Details.component.html',
  styleUrls: ['./course-Details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  dataFromService: any;
  studentsList: any
  arrayOfCourses: any;
  courseId: any;
  sessionsByCourseId: any;
  arrayOfStudents: any;
  displayedColumns=['startDateTime','endDateTime','title']

  constructor(private service: BackendApiService, private router: Router) { }
  ngOnInit() {
    this.getDataFromService()
    this.getData()
    console.log(this.arrayOfStudents)
  }
  getDataFromService() {
    this.dataFromService = this.service.getData()
    this.dataFromService? this.arrayOfStudents = this.dataFromService.students : this.router.navigate(["course"])
    this.courseId = this.dataFromService.id
    
    
  }
  getData(){
    this.service.get('getSessionsByCourseId'+this.courseId).subscribe((Response)=>{
      this.sessionsByCourseId= Response.body
    })
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

}
