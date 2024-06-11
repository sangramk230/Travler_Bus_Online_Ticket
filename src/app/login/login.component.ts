import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService, User } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = new User(0, '', '', '', '', '', '', '');
  adminDiv: boolean = false;
  signupDiv: boolean = false;
  loginDiv: boolean = true;
  currentDate: string ='';

  constructor(private loginService: LoginService, private router: Router) {
    this.setCurrentDate();

  }
  setCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    this.currentDate = today.toLocaleDateString('en-US',options);
  }
  toggleAdmin() {
    this.adminDiv = true;
    this.signupDiv = false;
    this.loginDiv = false;
  }
  toggleSignup(): void {
    this.adminDiv = false;
    this.signupDiv = true;
    this.loginDiv = false;
  }

  toggleLogin(): void {
    this.adminDiv = false;
    this.signupDiv = false;
    this.loginDiv = true;
  }
  adminLogin() {
    this.loginService
      .adminLogin(this.user.email, this.user.password)
      .subscribe((next) => {
        if (next == true) {
          this.adminDiv = false;
          this.router.navigateByUrl('adminpanel');
        } else {
          alert('Wrong Credentials');
          window.location.reload();
        }
      });
  }

  signup() {
    if (this.user.password != this.user.confirmPassword) {
      alert('wrong password');
    } else if (!this.user.name) {
      alert('Please Enter Name');
    } else if (!this.user.gender) {
      alert('Please Enter Gender');
    } else if (!this.user.dob) {
      alert('Please Enter Date of Birth');
    } else if (!this.user.email) {
      alert('Please Enter Email');
    } else if (!this.user.phoneno) {
      alert('Please Enter Phone No');
    } else if (!this.user.password) {
      alert('Please Enter Password');
    } else if (!this.user.confirmPassword) {
      alert('Please Enter Confirm Password');
    } else {
      this.loginService.signup(this.user).subscribe();
      alert('Signup Successful');
      this.loginDiv = true;
      this.signupDiv = false;
    }
  }
  login() {
    this.loginService
      .loginUser(this.user.email, this.user.password)
      .subscribe((next) => {
        if (next) {
          this.router.navigateByUrl('userpanel');
        } else {
          alert('Please Create Account..!');
          this.toggleSignup();
        }
      });
    }
}
