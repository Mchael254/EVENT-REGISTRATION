import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  line:boolean = false;
  loginError:boolean = false;
  userName:string = '';
  password:string = '';
  userEmail:string = '';
  confirmPassword:string = '';
  firstName:string = '';
  lastName:string = '';

  onSubmit(){

  }

}
