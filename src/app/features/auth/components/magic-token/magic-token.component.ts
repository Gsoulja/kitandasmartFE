import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-magic-token',
  imports: [],
  templateUrl: './magic-token.component.html',
  styleUrl: './magic-token.component.scss'
})
export class MagicTokenComponent {
  constructor(private route: ActivatedRoute,private router :Router,private loginService: AuthServiceService) {}

  ngOnInit(): void {

    if(this.loginService.isLoggedIn())
    {
      this.router.navigate(['/dashboard'])
    }
    // Get the token from the URL query parameters
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        this.loginService.login(token).subscribe(
          (response: { jwt: string }) => {
            console.log('Login successful', response);

            const receivedToken = response.jwt;
            if (receivedToken) {
              this.loginService.storeToken(receivedToken);
              console.log('Token saved to localStorage');
              window.location.reload();
            }
          },
          (error) => {
            console.error('Login failed', error);
          }
        );
      }
    });
  }
}
