import { Component } from '@angular/core';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  faUser = faUser;
  faEdit = faEdit;
  // views
  dashboard = false;
  profile = false;
  upcomingEvents = false;
  leaderboard = false;
  announcements = false;
  gearLocker = false;
  membership = false;
  support = false;
  activities = true;

  currentView = 'profile';
  setView(view: string):void {
    this.currentView = view;
  }


  // products
  products = [
    {
      picture: '../../assets/bibshort.webp',
      description: 'Cycling bibshorts with a comfortable fit and high-quality materials.',
      price: 'Ksh 1500',

    },
    {
      picture: '../../assets/hood.webp',
      description: 'Cycling hoods with a comfortable fit and high-quality materials.',
      price: 'Ksh 1500',
    },
    {
      picture: '../../assets/shirt.webp',
      description: 'Cycling jersey with a comfortable fit and high-quality materials.',
      price: 'Ksh 1500',
    },
    {
      picture: '../../assets/community.jpg',
      description: 'Get advice, tips, and guides from experienced cyclists.',
      price: 'Ksh 1500',
    }
  ];


  maxProducts = 3;
  currentIndex = 0;

  getDisplayedProducts() {
    const start = this.currentIndex;
    const end = (start + this.maxProducts) % this.products.length;

    return end > start
      ? this.products.slice(start, end)
      : [...this.products.slice(start), ...this.products.slice(0, end)];
  }

}
