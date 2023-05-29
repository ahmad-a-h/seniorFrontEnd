import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/backend-api.service';
const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})

export class CourseViewComponent {
  arrayOfCourses:any=[]
  selectedFile:any
  courseForm: FormGroup;
  courseId: any;
  currentObj: any;
  studentsList:any;
  totalNbStudents: any;
  sessionsList: any;
  noDate: boolean;
  dataSource;
  displayedColumns= ['course_Code', 'course_Name', 'course_Instructor', 'course_Description','events'];

  /**
   *
   */
   constructor(private service: BackendApiService,private router:Router) { 
    this.courseForm = new FormGroup({
      courseId:new FormControl('')
    })
  }
  ngOnInit() {
   this.getData()
   this.subscribeForm()
  }
  getData(){
    this.service.get('getAllCourses').subscribe((res)=>{
      this.arrayOfCourses = res.body
      console.log(res)
      // if(res.ok) this.dataSource = 
      this.dataSource = res.ok? this.arrayOfCourses: this.noDate=true
      console.log(this.dataSource)
      // console.log(this.arrayOfCourses )
    })
  }
  
  selectedRow(row: any) {
    this.currentObj = row; 
  }
  
  redirect(elem:any) {
    this.service.setData(elem)
    this.router.navigate(["courseDetails"]);
  }
  subscribeForm(){
    this.courseForm.get('courseId').valueChanges.subscribe(()=>{
      this.courseId = this.courseForm.controls['courseId'].value;
      this. currentObj = this.arrayOfCourses.find((id:any)=> id.id == this.courseId)
      this.getSessionsByCourse()
      console.log(this.courseForm.dirty)
    })
  }
  getSessionsByCourse(){
    console.log(this.courseId)
    this.service.get('getSessionsByCourseId'+this.courseId).subscribe((Response)=>{ 
      this.getSessionsByCourseId(Response.body)
    },(error)=>{
      console.log(error)
    })
  }

  getSessionsByCourseId(arr:any){
    this.sessionsList = arr
    // arr.forEach((element:any) => {
    //   var course = element.course;
    //   this.totalNbStudents = course.students.length
    // });
    console.log(arr)
  }
  viewCourse(sessionId:any){
    console.log(sessionId)
  }

}