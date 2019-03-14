import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    public authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.authService.loginForm.reset();
  }

  loginUser(user) {
    this.authService.userLogin(user).subscribe(res => {
      this.authService.loginForm.reset();
      if (res['success']) {
        this.user = res['user'];
        this.authService.storeAdminData(res['token'], this.user._id);
        this.notificationService.success('Success', 'Login successfull.');
        this.router.navigate(['profile']);
      } else {
        this.notificationService.success('Failed', res['msg']);
      }
    }, error => {
      this.notificationService.error('Failed', error['message']);
    });
  }

}
