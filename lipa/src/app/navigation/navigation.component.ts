import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  faBars = faBars; 
  isDrawerOpen = false; 
  options:boolean = true;

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.options = false
  }

}
