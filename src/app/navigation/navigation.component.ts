import { LyTheme2 } from '@alyle/ui';
import { Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterEvent,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// default, added by Alyle for dynamic styling
const styles = {
  content: {
    padding: '2em'
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
};

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  classes = this.theme.addStyleSheet(styles);
  selectedIndex = 0;
  constructor(
    private theme: LyTheme2,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url);
        switch (event.url) {
          case '/home':
            this.selectedIndex = 0;
            break;
          case '/playground':
            this.selectedIndex = 1;
            break;
          case '/shopping-list':
            this.selectedIndex = 2;
            break;
        }
      }
    });
    // cannot use this in this case, activatedRoute can detect the component defined in the routing module
    // this.activatedRoute.url
    //   .subscribe(url => console.log('The URL changed to: ' + url));
  }

  onNavigate(path: string): void {
    // Utilizing this approach is because cannot put 'routerLink' on the button in the navigation bar
    this.router.navigate([`${path}`]);
  }
}
