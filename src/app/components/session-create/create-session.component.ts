import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/http/backend-api.service';
import * as moment_ from 'moment';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

const moment = moment_;

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css'],
  providers: [DatePipe]
})
export class CreateSessionComponent implements OnInit {
  arrayOfCourses: any = []
  sessionForm: FormGroup;
  courseID: any;
  currentObj: any;
  studentsList: any;
  totalNbStudents: any;
  sessionsList: any;
  data
  public date: Date;
  public disabled = false;
  public showSpinners = true;
  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());

  constructor(private service: BackendApiService, private router: Router,private datePipe: DatePipe) {
    this.sessionForm = new FormGroup({
      courseID: new FormControl(''),
      title: new FormControl('',Validators.required),
      startDateTime: new FormControl(Validators.required),
      endDateTime: new FormControl(Validators.required),
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
    this.date = new Date();
    this.getData()
    this.subscribeForm()
  }
  getData() {
    this.service.get('getAllCourses').subscribe((res) => {
      this.arrayOfCourses = res.body
    })
  }

  subscribeForm() {
    this.sessionForm.get('courseID').valueChanges.subscribe(() => {
      this.courseID = this.sessionForm.controls['courseID'].value
      this.currentObj = this.arrayOfCourses.find((id: any) => id.id == this.courseID)
      this.getSessionsByCourse()
    })
    this.sessionForm.get('startDateTime').valueChanges.subscribe(() => {
      console.log(this.sessionForm.get('startDateTime').value)
    })
  }
  getSessionsByCourse() {
    console.log(this.courseID)
    this.service.get('getSessionsByCourseId' + this.courseID).subscribe((Response) => {
      this.getSessionsByCourseId(Response.body)
    }, (error) => {
      console.log(error)
    })
  }

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
  onSubmit(sessionForm: FormGroup) {
    // console.log(this.startDate.value)
    var startDate=new Date(this.startDate.value)
    var endDate= new Date(this.endDate.value)
    var same = startDate.getTime() - endDate.getTime()
    if (same<0){
      this.sessionForm.controls.startDateTime.setValue(this.transformDateToISO(this.startDate.value))
      this.sessionForm.controls.endDateTime.setValue (this.transformDateToISO(this.endDate.value))
      console.log(this.sessionForm.value)
      console.log(this.startDate.value)
      console.log(this.endDate.value)
      if(this.sessionForm.valid){
        this.service.post('createSession',this.sessionForm.value).subscribe((resp)=>{
          Swal.fire({
            icon: 'success',
            position: 'top-end',
            text: 'Session Has Been Created!',
            showConfirmButton: false,
            timer: 1500
          })
        },(error)=>{
          console.log(error)
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title:"Fix Input Dates",
        text: "End date can't be less than start date",
        showConfirmButton: false,
        timer: 3000
      })
    }
   
  }

  transformDateToISO(date:any){
    return this.datePipe.transform(date, 'M/d/yyyy, HH:mm:ss');
  }
}

// {
//   "endDateTime": "2023-05-16T20:00:33.583Z",
//   "startDateTime": "2023-05-16T20:00:33.583Z",
//   "class_id": 0,
//   "courseID": 0
// }