import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/service/http/backend-api.service';
import { JwtService } from 'src/app/service//jwt/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:any = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  resetpassForm:any = new FormGroup({
    email: new FormControl()
  });
  constructor(private service:BackendApiService,private jwtService:JwtService,private router:Router){}

    ngOnInit(): void {
    console.log('test')
      var loggedIn = this.jwtService.loggedIn();
      if(loggedIn == false){
      this.router.navigate(["login"]);
      }
    }
    func(){
      console.log('test')
    }
    onSubmit(): void {
      if (this.loginForm.valid) {
        this.service.post("Account/new-login", this.loginForm.value).subscribe(
          (res: any) => {
            console.log(res.jwt)
            this.jwtService.setJwtInLocalStorage(res.jwt);
            var decodedjwt = this.jwtService.getDecodedAccessToken();
            console.log(decodedjwt)
            if(decodedjwt["role"] == 'Admin'||decodedjwt["role"] == 'DataEntry'){
              this.router.navigate([""]);
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: `${error.error}`,
              showConfirmButton: false,
              timer: 3000
            })
          }
        );
        this.loginForm.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Please enter your username and password',
          showConfirmButton: false,
          timer: 3000
        });
      }
    }


    async forgotpass()
    {
      const { value: email } = await Swal.fire({
        title: 'Input email address to send a reset link',
        input: 'email',
        inputPlaceholder: 'Enter your email address'
      })

      if (email) {
        this.service.post("Account/forgotPassword?email="+email, this.resetpassForm.value).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'An email has been sent!',
              text: 'Check your inbox.',
            })
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: `${error.error}`,
              showConfirmButton: false,
              timer: 3000
            })
          }
        );
      }
    }
}
