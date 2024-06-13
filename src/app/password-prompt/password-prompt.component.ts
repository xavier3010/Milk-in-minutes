import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-password-prompt',
  templateUrl: './password-prompt.component.html',
  styleUrls: ['./password-prompt.component.css']
})
export class PasswordPromptComponent {
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  submitPassword(): void {
    if (this.authService.authenticate(this.password)) {
      this.router.navigate(['/admin']);
    } else {
      // Handle incorrect password
    }
  }
}