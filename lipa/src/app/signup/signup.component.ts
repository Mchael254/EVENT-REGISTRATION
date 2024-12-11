import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authService: AuthService) {}
  

  line: boolean = false;
  loginError: string = '';
  userName: string = '';
  password: string = '';
  userEmail: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';

  emailChecker() {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegex.test(this.userEmail)) {
      this.loginError = "invalid email";
      setTimeout(() => {
        this.loginError = '';
      }, 3000);
      return;
    }

  }

  passwordChecker() {
    if (this.password.length < 8) {
      this.loginError = "password must be at least 8 characters";
      setTimeout(() => {
        this.loginError = '';
      }, 3000);
      return;
    } else if (this.password != this.confirmPassword) {
      this.loginError = "passwords do not match";
      setTimeout(() => {
        this.loginError = '';
      }, 3000);
      return;
    }//check characters and special characters
    else if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.\-])[A-Za-z\d$@$!%*?&#.\-]{8,}$/
    )) {
      this.loginError = "password must have at least one uppercase, one lowercase, one number and one special character";
      setTimeout(() => {
        this.loginError = '';
      }, 5000);
      return;
    }
  }

  onSubmit() {
    this.line = true;
    if (this.userName == '' || this.password == '' || this.userEmail == '' ||
      this.confirmPassword == '' || this.firstName == '' || this.lastName == '') {
      this.loginError = "all fields are required";
      setTimeout(() => {
        this.loginError = '';
      }, 3000);
      this.line = false;
      return;
    } else {
      this.emailChecker();
      if (this.loginError) {
        this.line = false;
        return;
      }
      this.passwordChecker();
      if (this.loginError) {
        this.line = false;
        return;
      }

      //user data
      let userData = {
        userName: this.userName,
        password: this.password,
        userEmail: this.userEmail,
        firstName: this.firstName,
        lastName: this.lastName
      }

      console.log(userData);

      //send data to the server
      this.authService.register(userData).subscribe(
        (response) => {
          console.log(response);
          this.loginError = "User registered successfully";
          setTimeout(() => {
            this.loginError = '';
          }, 3000);
        },
        (error) => {
          console.log(error);
          this.loginError = error.message;
          const errorResponse = error.error;
          if (errorResponse && errorResponse.message) {
            this.loginError = errorResponse.message;
            console.log(errorResponse.message);
            
          } else if (errorResponse && errorResponse.error) {
            this.loginError = errorResponse.error;
            console.log(errorResponse.error);
            
          } else {
            this.loginError = error.message;
          }
          setTimeout(() => {
            this.loginError = '';
            this.line = false;
          }, 3000);
        }
      );
      

    }


  }
}
