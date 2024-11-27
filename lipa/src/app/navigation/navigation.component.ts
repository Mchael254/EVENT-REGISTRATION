import { Component } from '@angular/core';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  faBars = faBars; 
  faBack = faChevronLeft;
  isDrawerOpen = false; 

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

}
