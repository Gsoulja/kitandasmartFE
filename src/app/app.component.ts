import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MenuComponent} from './shared/menu/menu.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './core/interceptor/auth.interceptor';
import {AuthServiceService} from './features/auth/services/auth-service.service';
import {NgIf} from '@angular/common';
import {MatAnchor} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatListModule, MatIconModule, MatToolbar, RouterLink, RouterLinkActive, NgIf, MatAnchor],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // Allow multiple interceptors
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kitandasmartFE';
  isLoggedIn: boolean;
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver,private authService: AuthServiceService) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();  // Logout the user
    this.isLoggedIn = false;  // Update the UI
  }
}
