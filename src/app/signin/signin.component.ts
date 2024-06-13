import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  signInResult: string | undefined;
  isSignedIn: boolean = false;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {
    // Check if user is already signed in
    // const storedUsername = localStorage.getItem('username');
    // if (storedUsername) {
    //   this.sharedService.setUsername(storedUsername);
    //   this.isSignedIn = true;
    // }
  }

  signIn() {
    // Assuming you have a JSON server running at http://localhost:3000
    this.http.get<any[]>('http://localhost:3001/users').subscribe(users => {
      const user = users.find(u => u.email === this.email && u.password === this.password);
      if (user) {
        this.signInResult = 'Sign in successful';
        this.isSignedIn = true;
        // Assuming your user object has a 'username' property
        this.sharedService.setUsername(user.username); // Share the username with the shared service
        localStorage.setItem('username', user.username); // Store username in localStorage
        alert('Sign in successful!'); // Alert message instead of MatSnackBar
        this.router.navigate(['/']); // Redirect to home page or any other page
      } else {
        this.signInResult = 'Invalid email or password';
      }
      this.email = '';
      this.password = '';
    });
  }


}







// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { SharedService } from '../shared.service';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrl: './signin.component.css'
// })
// export class SigninComponent {
//   email: string = '';
//   password: string = '';
//   signInResult: string | undefined;
//   isSignedUp: boolean = false;

//   constructor(private http: HttpClient, private sharedService: SharedService) { }

//   signIn() {
//     // Assuming you have a JSON server running at http://localhost:3000
//     this.http.get<any[]>('http://localhost:3001/users').subscribe(users => {
//       const user = users.find(u => u.email === this.email && u.password === this.password);
//       if (user) {
//         this.signInResult = 'Sign in successful';
//         this.isSignedUp = true;
//         // Assuming your user object has a 'username' property
//         this.sharedService.setUsername(user.username); // Share the username with the shared service
//       } else {
//         this.signInResult = 'Invalid email or password';
//       }
//       this.email = '';
//       this.password = '';
//     });
//   }
// }







