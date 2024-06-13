import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData: any = {};
  isSignedUp: boolean = false;
  signupForm: FormGroup;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required]
    });
  }

  get formControls() { return this.signupForm.controls; }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.http.post<any>('http://localhost:3001/users', this.signupForm.value)
      .subscribe(() => {
        console.log('User successfully signed up!');
        this.isSignedUp = true; // Change sign-up state
        this.snackBar.open('Sign up successful!', 'Close', {
          duration: 3000,
        });
      }, error => {
        console.error('Error signing up:', error);
      });
      
    this.signupForm.reset(); // Clear form fields
  }
}


// export class SignupComponent {
//   formData: any = {};

//   constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

//   onSubmit() {
//     this.http.post<any>('http://localhost:3001/users', this.formData)
//       .subscribe(() => {
//         console.log('User successfully signed up!');
//         // You can add further logic here like redirecting to another page
//       }, error => {
//         console.error('Error signing up:', error);
//       });
//       this.formData = {};
//       this.snackBar.open('Sign up successful!', 'Close', {
//         duration: 3000, // Snackbar display duration in milliseconds
//       });
//   }
// }
