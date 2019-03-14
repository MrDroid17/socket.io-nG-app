import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService

  ) { }

  ngOnInit() {

    this.getProfile();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // get user profile
  getProfile() {
    this.authService.getProfile().subscribe(res => {
      if (res) {
        this.user = res['user'];
      } else {
        this.notificationService.error('Failed', 'Error getting user info');
      }

    });
  }
}
