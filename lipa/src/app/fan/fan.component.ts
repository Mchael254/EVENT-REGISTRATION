import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.css']
})
export class FanComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) { }

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(
      distinctUntilChanged(),
    );

  ngOnInit(): void {
    this.detectDeviceSize();
    this.breakpoint$.subscribe(() => this.adjustMaxFeatures());

  }
  private detectDeviceSize() {
    const width = window.innerWidth;

    if (width >= 1200) {
      this.maxFeatures = 3;
      this.maxRoutes = 3;
      this.maxProducts = 3;
    } else if (width >= 768 && width < 1200) {
      this.maxFeatures = 2;
      this.maxRoutes = 2;
      this.maxProducts = 2;
    } else {
      this.maxFeatures = 1;
      this.maxRoutes = 1;
      this.maxProducts = 1;
    }
  }

  private adjustMaxFeatures() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.maxFeatures = 3;
      this.maxRoutes = 3;
      this.maxProducts = 3;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.maxFeatures = 2;
      this.maxRoutes = 2;
      this.maxProducts = 2;

    } else if (this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.maxFeatures = 1;
      this.maxRoutes = 1;
      this.maxProducts = 1;
    
    }
  }

  maxFeatures = 3;
  maxRoutes = 3;

  routes = [
    {
      title: 'Bike Route Discovery',
      picture: '../../assets/community.jpg',
      description: 'Find the best routes based on difficulty, location, and type of cycling.',

    },
    {
      title: 'Group Rides',
      picture: '../../assets/route.jpg',
      description: 'Join scheduled group rides near you or create your own.'
    },
    {
      title: 'Gear Shop',
      picture: '../../assets/gear.jpg',
      description: 'Browse top-tier cycling gear with exclusive discounts for members.'
    },
    {
      title: 'Member Support',
      picture: '../../assets/community.jpg',
      description: 'Get advice, tips, and guides from experienced cyclists.'
    }
  ];


  currentRoute = 0;
  maxProducts = 3;

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

  //products
  products = [
    {
      title: 'Cycling Jersey',
      picture: '../../assets/bibshort.webp',
      description: 'Stay cool and comfortable on your rides with our moisture-wicking jerseys.',
      price: 49.99
    },
    {
      title: 'Cycling Shorts',
      picture: '../../assets/bibshort.webp',
      description: 'Ride longer and harder with our padded cycling shorts.',
      price: 59.99
    },
    {
      title: 'Cycling Shoes',
      picture: '../../assets/bibshort.webp',
      description: 'Maximize your power output with our stiff-soled cycling shoes.',
      price: 99.99
    },
    {
      title: 'Cycling Helmet',
      picture: '../../assets/bibshort.webp',
      description: 'Protect your head and ride in style with our aerodynamic helmets.',
      price: 79.99
    },
    {
      title: 'Cycling Gloves',
      picture: '../../assets/bibshort.webp',
      description: 'Keep your hands comfortable and protected with our padded gloves.',
      price: 19.99
    },
    {
      title: 'Cycling Glasses',
      picture: '../../assets/shirt.webp',
      description: 'Shield your eyes from the sun and debris with our wraparound glasses.',
      price: 29.99
    },
    {
      title: 'Cycling Socks',
      picture: '../../assets/shirt.webp',
      description: 'Keep your feet dry and blister-free with our moisture-wicking socks.',
      price: 9.99
    },
    {
      title: 'Cycling Water Bottle',
      picture: '../../assets/shirt.webp',
      description: 'Stay hydrated on your rides with our insulated water bottles.',
      price: 14.99
    }

  ];

}
