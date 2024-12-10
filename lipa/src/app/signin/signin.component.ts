import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  line:boolean = false;
  loginError:boolean = false;
  userName:string = '';
  password:string = ''

  onSubmit(){

  }

}
