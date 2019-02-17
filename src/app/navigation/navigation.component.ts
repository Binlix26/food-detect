import {Component, OnInit} from '@angular/core';
import {LyTheme2} from '@alyle/ui';
import {Router} from '@angular/router';

// default, added by Alyle for dynamic styling
const styles = ({
  content: {
    padding: '2em'
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
});

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  classes = this.theme.addStyleSheet(styles);

  constructor(
    private theme: LyTheme2,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onNavigate(path: string): void {
    // Utilizing this approach is because cannot put 'routerLink' on the button in the navigation bar
    this.router.navigate([`${path}`]);
  }
}
