import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  };

  success(msg, action) {
    this.config['panelClass'] = ['notification', 'insert'];
    this.snackBar.open(msg, action, this.config);
  }

  error(msg, action) {
    this.config['panelClass'] = ['notification', 'error'];
    this.snackBar.open(msg, action, this.config);
  }
}
