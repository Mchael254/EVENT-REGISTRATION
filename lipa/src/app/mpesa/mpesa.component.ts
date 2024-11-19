import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mpesa',
  templateUrl: './mpesa.component.html',
  styleUrls: ['./mpesa.component.css']
})
export class MpesaComponent {
  userName:string = "";
  phone:string = "";
  category:string = "";
  form:boolean = true;
  payForm:boolean = false;
  error:string = "";
  mpesa:boolean = false;

  payRace(){

  }

  pay(){
    //check all fields are filled
    if(this.userName == "" || this.phone == "" || this.category == ""){
      this.error="All fields are required";
      setTimeout(() => {
        this.error = "";
      }, 3000);
      return;
    }
    this.form = false;
    this.payForm = true;

  }

  editDetails(){
    this.form = true;
    this.payForm = false;
  }

  payMpesa(){
    this.payForm = false;
    this.mpesa = true;
  }
 

}
