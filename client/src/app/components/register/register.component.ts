import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ValidationService } from 'src/app/service/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private notificationService: NotificationService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
  }

  registerUser(user) {
    if (!this.validationService.matchPassword(user['password'], user['confirm_password'])) {
      this.notificationService.error('Failed', 'Password do not match');
    } else {
      this.authService.userRegister(user).subscribe(res => {
        if (res['success']) {
          this.notificationService.success('Success', 'User Registered.');
          this.router.navigate(['login']);
        } else {
          this.notificationService.success('Failed', res['msg']);
        }
      }, error => {
        this.notificationService.error('Failed', error['message']);
      });
    }
  }

}
