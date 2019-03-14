import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// tslint:disable:max-line-length
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSidenavModule,
  MatIconModule, MatSnackBarModule} from '@angular/material';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: false }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
