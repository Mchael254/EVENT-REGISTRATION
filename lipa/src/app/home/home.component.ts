import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) { }
  Breakpoints = Breakpoints;

  features = [
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
    } else if (width >= 768 && width < 1200) {
      this.maxFeatures = 2;
      this.maxRoutes = 2;
    } else {
      this.maxFeatures = 1;
      this.maxRoutes = 1;
    }
  }

  private adjustMaxFeatures() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.maxFeatures = 3;
      this.maxRoutes = 3;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.maxFeatures = 2;
      this.maxRoutes = 2;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.maxFeatures = 1;
      this.maxRoutes = 1;
    } else if (this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.maxFeatures = 1;
      this.maxRoutes = 1;
    }
  }

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

  getDisplayedProducts() {
    const start = this.currentIndex;
    const end = (start + this.maxProducts) % this.products.length;

    return end > start
      ? this.products.slice(start, end)
      : [...this.products.slice(start), ...this.products.slice(0, end)];
  }



}
