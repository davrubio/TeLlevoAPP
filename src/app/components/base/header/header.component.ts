import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserLocalData } from 'src/app/models/user/user.info';
import { APICarService } from 'src/app/services/API/apicar.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ManageLocalData } from 'src/app/utils/manage.localdata';
import { ManageSession } from 'src/app/utils/manage.session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HeaderComponent extends ManageSession implements OnInit {

  @Input({required:true})
  titlePage!: string;
  darkMode = false;

  userData: UserLocalData;

  constructor( 
    authService: AuthService,
    private carService: APICarService,
    private router: Router, 
  ) {
    super(authService);
    this.userData = ManageLocalData.getLocalData();
  }

  ngOnInit() {
    this.checkAppMode();
  }

  checkAppMode(){
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    checkIsDarkMode == 'true' ? (this.darkMode = true) : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }
  /* initializeDarkTheme(isDark: any) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  } */

  toggleChange() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode){
      localStorage.setItem('darkModeActivated', 'true');
    } else {
      localStorage.setItem('darkModeActivated', 'false');
    }
  }

  /* toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  } */

  redirecToProfile(){
    this.router.navigate(['/profile'], {state: {user: this.userData}});
  }

  redirecToDriverForm(){
    this.router.navigate(['/form/conductor'], {state: {user: this.userData}});
  }
  
}
