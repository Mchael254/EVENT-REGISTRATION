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
   // Track current index and max features
   currentIndex = 0;
   maxFeatures = 3;
 
   // Navigate to the previous set of features
   prevFeatures() {
     this.currentIndex = 
       (this.currentIndex - 1 + this.features.length) % this.features.length;
   }
 
   // Navigate to the next set of features
   nextFeatures() {
     this.currentIndex = 
       (this.currentIndex + 1) % this.features.length;
   }
 
   // Get the features to display
   getDisplayedFeatures() {
     const start = this.currentIndex;
     const end = (start + this.maxFeatures) % this.features.length;
 
     // Handle circular slicing
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

   // Track current index and max features
   currentRoute = 0;
   maxRoutes = 3;
 
   // Navigate to the previous set of features
   prevRoutes() {
     this.currentRoute = 
       (this.currentRoute - 1 + this.routes.length) % this.routes.length;
   }
 
   // Navigate to the next set of features
   nextRoutes() {
     this.currentRoute = 
       (this.currentRoute + 1) % this.routes.length;
   }
 
   // Get the features to display
   getDisplayedRoutes() {
     const start = this.currentRoute;
     const end = (start + this.maxRoutes) % this.routes.length;
 
     // Handle circular slicing
     return end > start
       ? this.routes.slice(start, end)
       : [...this.routes.slice(start), ...this.routes.slice(0, end)];
   }

 
}
