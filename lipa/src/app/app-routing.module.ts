import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { EventComponent } from './event/event.component';
import { PayComponent } from './pay/pay.component';
import { MpesaComponent } from './mpesa/mpesa.component';
import { WebhookComponent } from './webhook/webhook.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FanComponent } from './fan/fan.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'landing',component: LandingComponent},
  {path:'event',component:EventComponent},
  {path:'pay',component:PayComponent},
  {path:'mpesa',component:MpesaComponent},
  {path:'webhook',component:WebhookComponent},
  {path:'navigation',component:NavigationComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'footer',component:FooterComponent},
  {path:'home',component:HomeComponent},
  {path:'fan',component:FanComponent},
  {path:'product',component:ProductComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'profile',component:ProfileComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
