import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private authService: AuthService, private router: Router) { }
  line:boolean = false;
  loginError:string = '';
  userEmail:string = '';
  password:string = ''

  onSubmit() {
    this.line = true;
    setTimeout(() => {
      if (this.userEmail == '' || this.password == '') {
        this.loginError = 'All fields are required';
        setTimeout(() => {
          this.loginError = '';
        }, 3000);
        this.line = false;
        return;  
      }
  
      const loginData = {
        userEmail: this.userEmail,
        password: this.password
      };
  
      console.log(loginData);
  
      this.authService.login(loginData).subscribe(
        (response) => {
          console.log(response);
          this.line = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
          this.loginError = error.message;
          setTimeout(() => {
            this.loginError = '';
          }, 3000);
          this.line = false;
        }
      );  
  
    }, 2000);  
  }
  

}
