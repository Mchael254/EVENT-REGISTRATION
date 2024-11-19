import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  constructor(private router:Router) { }

  mpesa() {
    this.router.navigate(['/mpesa']);
  }

}
