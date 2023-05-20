import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/backend-api.service';
import * as moment_ from 'moment';
import Swal from 'sweetalert2';

const moment = moment_;

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
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

  constructor(private service: BackendApiService, private router: Router) {
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
      console.log(this.arrayOfCourses)
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
    this.sessionForm.controls.startDateTime.setValue(this.transformDateToISO(this.startDate.value))
    this.sessionForm.controls.endDateTime.setValue (this.transformDateToISO(this.endDate.value))
    console.log()
    if(this.sessionForm.valid){
      this.service.post('createSession',this.sessionForm.value).subscribe((resp)=>{
        Swal.fire({
          icon: 'success',
          text: 'Session Has Been Created!',
          showConfirmButton: false,
          timer: 1500
        })
      },(error)=>{
        console.log(error)
      })
    }
  }

  transformDateToISO(date:any){
    const formattedDateTimeString = this.startDate.value.toISOString();
    return formattedDateTimeString
  }
}

// {
//   "endDateTime": "2023-05-16T20:00:33.583Z",
//   "startDateTime": "2023-05-16T20:00:33.583Z",
//   "class_id": 0,
//   "courseID": 0
// }