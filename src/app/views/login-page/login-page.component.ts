import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
  providers: []
})
export class LoginPageComponent {
  public username: string = 'Admin';
  public password: string = '';

  constructor(public authService: AuthenticationService, private router: Router) {}

  public async onSubmit() {
    const loggedIn = await this.authService.login({ username: this.username, password: this.password });

    if (loggedIn) {
      this.router.navigate(['/']);
    }
  }
}
