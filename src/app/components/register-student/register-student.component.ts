import { Component, ɵɵsetComponentScope } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendApiService } from 'src/app/service/backend-api.service';
import Swal from 'sweetalert2';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent {
  studentForm:FormGroup ;
  selectedPhoto: any='';
  img: string;
  fileInput: HTMLInputElement;
  courseId: string;
  arrayOfCourses: Object;
  formData: any;


  constructor(private service: BackendApiService) { 
    this.studentForm = new FormGroup({
      fName: new FormControl('',[Validators.required]),
      lName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      courseId: new FormControl('',[Validators.required]),
      photo:new FormControl(),
    })
  }
  ngOnInit() {
    this. getCourses()
    // this.subscribeTophotoField()
  }
  onSubmit(){
    if(this.studentForm.valid){
      let data = this.studentForm.value
      this.service.post('registerStudent', data).subscribe((Response) => {
          this.service.post('assignCourseStudent'+Response+'?courseId='+this.studentForm.controls.courseId.value,'').subscribe((resp)=>{
            // const file = this.studentForm.controls.photo.value
            
            this.service.post('AssignFaceForStudent'+'?studentID='+Response,this.img).subscribe((Response)=>{
            Swal.fire({
              icon: 'success',
              text: 'Student Has Been Registered!',
              showConfirmButton: false,
              timer: 1500
            })
          },(err)=>{
            console.log('error')
          })
          })
        },
        (error) => {
          console.log('Error:', error);
        }
      );
      
    }
    else{

      Swal.fire({
        icon: 'error',
        title:'Incorrect Form Values Entered',
        text: 'Please check the values errors',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      this.selectedPhoto = file.name
      reader.onload = (event:any) => {
        console.log('test')
        const base64String = event.target.result as string;
        this.img=base64String
      };
      // console.log(this.studentForm.controls['photo'].value)
      reader.readAsDataURL(file);
      return
    }
    
  }

  getCourses(){
      this.service.get('getAllCourses').subscribe((res)=>{
        
        if(res.ok)
        this.arrayOfCourses = res.body
        console.log(res)
        // if(res.ok) this.dataSource = 
        // this.dataSource = res.ok? this.arrayOfCourses: this.noDate=true
        // console.log(this.dataSource)
        // console.log(this.arrayOfCourses )
      },(error)=>{
        console.log(error)
      })
  }
  
  // subscribeTophotoField(){
  //   // this.studentForm.controls.photo.valueChanges.subscribe(photo=>{
  //   //   console.log(photo)
  //   //   const reader = new FileReader();
  //   //   var base64String;
  //   //   reader.onload = (photo:any) => {
  //   //     base64String = photo.target.result as string;
  //   //   };
  //   //   if(!this.isValidBase64(base64String))
  //   //     this.studentForm.controls.photo.setErrors({invalidImg:true})
  //   // })
  // }
  
  // isValidBase64(str) {
  //   try {
  //     // Check if the string can be decoded from Base64
  //     const decodedString = atob(str);
      
  //     // Check if the decoded string can be re-encoded to Base64 without loss
  //     const reencodedString = btoa(decodedString);
      
  //     // Compare the re-encoded string with the original string
  //     return true
  //   } catch (error) {
  //     // Catch any errors that occur during decoding or re-encoding
  //     return false;
  //   }
  // }
}

  // getData() {
  //   this.service.get('MembersList/' + this.getIdFromData).subscribe(response => {
  //     this.data = response.body
  //     this.title = this.data.title
  //     console.log(this.data.clients)
  //     this.data2 = this.data.clients
  //     this.emailsTable = this.fb.group({
  //       tableRows: this.fb.array(
  //         this.data.clients.map((datum: any) => this.initiateForm(datum))
  //       ),
  //     });
  //   })
  // }

