import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      title: 'Bike Route Discovery',
      picture:'../../assets/community.jpg',
      description: 'Find the best routes based on difficulty, location, and type of cycling.',
      
    },
    {
      title: 'Group Rides',
      picture:'../../assets/route.jpg',
      description: 'Join scheduled group rides near you or create your own.'
    },
    {
      title: 'Gear Shop',
      picture:'../../assets/gear.jpg',
      description: 'Browse top-tier cycling gear with exclusive discounts for members.'
    },
    {
      title: 'Member Support',
      picture:'../../assets/community.jpg',
      description: 'Get advice, tips, and guides from experienced cyclists.'
    }
  ];

   currentIndex = 0;
   maxFeatures = 3;
 
   prevFeatures() {
     this.currentIndex = 
       (this.currentIndex - 1 + this.features.length) % this.features.length;
   }
 
   nextFeatures() {
     this.currentIndex = 
       (this.currentIndex + 1) % this.features.length;
   }

   getDisplayedFeatures() {
     const start = this.currentIndex;
     const end = (start + this.maxFeatures) % this.features.length;
 
     return end > start
       ? this.features.slice(start, end)
       : [...this.features.slice(start), ...this.features.slice(0, end)];
   }

  routes = [
    {
      title: 'Bike Route Discovery',
      picture:'../../assets/community.jpg',
      description: 'Find the best routes based on difficulty, location, and type of cycling.',
      
    },
    {
      title: 'Group Rides',
      picture:'../../assets/route.jpg',
      description: 'Join scheduled group rides near you or create your own.'
    },
    {
      title: 'Gear Shop',
      picture:'../../assets/gear.jpg',
      description: 'Browse top-tier cycling gear with exclusive discounts for members.'
    },
    {
      title: 'Member Support',
      picture:'../../assets/community.jpg',
      description: 'Get advice, tips, and guides from experienced cyclists.'
    }
  ];


   currentRoute = 0;
   maxRoutes = 3;
 
   prevRoutes() {
     this.currentRoute = 
       (this.currentRoute - 1 + this.routes.length) % this.routes.length;
   }
 

   nextRoutes() {
     this.currentRoute = 
       (this.currentRoute + 1) % this.routes.length;
   }
 

   getDisplayedRoutes() {
     const start = this.currentRoute;
     const end = (start + this.maxRoutes) % this.routes.length;
 
     return end > start
       ? this.routes.slice(start, end)
       : [...this.routes.slice(start), ...this.routes.slice(0, end)];
   }

 
}
