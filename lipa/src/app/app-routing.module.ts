import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { EventComponent } from './event/event.component';
import { PayComponent } from './pay/pay.component';
import { MpesaComponent } from './mpesa/mpesa.component';

const routes: Routes = [
  {path:'',redirectTo:'/landing',pathMatch:'full'},
  { path:'landing',component: LandingComponent},
  {path:'event',component:EventComponent},
  {path:'pay',component:PayComponent},
  {path:'mpesa',component:MpesaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
