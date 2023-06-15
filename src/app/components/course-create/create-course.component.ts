import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/http/backend-api.service';
import * as moment_ from 'moment';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

const moment = moment_;

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  providers: [DatePipe]
})
export class CreateCourseComponent implements OnInit {
  arrayOfCourses: any = []
  sessionForm: FormGroup;
  courseID: any;
  currentObj: any;
  studentsList: any;
  totalNbStudents: any;
  sessionsList: any;
  data
  arrayOfClasses:any

  public date: Date;
  public disabled = false;
  public showSpinners = true;
  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());

  constructor(private service: BackendApiService, private router: Router,private datePipe: DatePipe) {
    this.sessionForm = new FormGroup({
      course_Code: new FormControl(''),
      course_Name: new FormControl('',Validators.required),
      course_Description: new FormControl(Validators.required),
      course_Instructor: new FormControl(Validators.required),
      classid: new FormControl(Validators.required),
      
    })

    
  }
    //   if (this.sessionForm.controls['DateTime'] ) {
    //     let dateTime : any = moment(this.sessionForm.controls['DateTime'].value).format("YYYY-MM-DD HH:MM:SS");
    //     if (this.sessionForm.controls['DateTime'].format === 'dd/MM/yyyy hh:mm:ss' ) {
    //      // this.newDateTime = moment(this.fieldData.data).format('YYYY/MM/D hh:mm:ss SS S')
    //        this.newDateTime = this.fieldData.data ? new Date(this.fieldData.data) : null
    //     }else{
    //      //  this.newDateTime = new Date(this.fieldData.data)
    //      let dateToTimestamp = this.strToDate(this.fieldData.data)
    //       this.newDateTime = dateToTimestamp
    //     }
    //  }
  ngOnInit() {
    this.getClass()
    // this.subscribeForm()
  }

  getClass(){
    this.service.get('getAllClasses').subscribe((res) => {
      this.arrayOfClasses = res.body
      
    console.log(this.arrayOfClasses)
    })
  }
  // subscribeForm() {
  //   this.sessionForm.get('classid').valueChanges.subscribe(() => {
  //     this.classid = this.sessionForm.controls['classid'].value
  //     this.currentObj = this.arrayOfCourses.find((id: any) => id.id == this.classid)
  //   })
  // }


  getSessionsByCourseId(arr: any) {
    this.sessionsList = arr
    // arr.forEach((element:any) => {
    //   var course = element.course;
    //   this.totalNbStudents = course.students.length
    // });
    console.log(arr)
  }
  viewCourse(sessionId: any) {
    console.log(sessionId)
  }
  reDirect(arr: any) {
    console.log(arr)
    this.router.navigate(["specificSession"]);
    // this.service.Data(arr)

  }

}

// {
//   "endDateTime": "2023-05-16T20:00:33.583Z",
//   "startDateTime": "2023-05-16T20:00:33.583Z",
//   "class_id": 0,
//   "courseID": 0
// }