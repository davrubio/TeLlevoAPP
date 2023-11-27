import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { UserLocalData } from 'src/app/models/user/user.info';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class HeaderComponent implements OnInit {

  @Input({required:true})
  titlePage!: string;
  darkMode = false;
  dialog: boolean = false;
  showFiller = false;

  userData: UserLocalData | undefined;

  constructor( 
    private authService: AuthService,
    private router: Router, 
    private navCtrl: NavController,
    private menuCrtl: MenuController,
    private manageLocalData : UtilsService,
    private location: Location,
  ) {
    
  }
  
  async ngOnInit() {
    this.checkAppMode();
    let localData: any = await this.manageLocalData.getFromLocalStorage('userdata');
    this.userData = JSON.parse(localData);
  }

  goBack(){
    this.navCtrl.back();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {   
        this.menuCrtl.close();
      }
    });
  }

  async checkAppMode(){
    let data: any = await this.manageLocalData.getFromLocalStorage('darkModeActivated')
    let checkIsDarkMode: {value: string} = JSON.parse(data);
    
    if(checkIsDarkMode == null){
      checkIsDarkMode = {value:'false'};
      this.manageLocalData.saveLocalStorage('darkModeActivated', checkIsDarkMode.value)
    }

    checkIsDarkMode.value == 'true' ? (this.darkMode = true) : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleChange() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode){
      this.manageLocalData.saveLocalStorage('darkModeActivated', {value:'true'});
    } else {
      this.manageLocalData.saveLocalStorage('darkModeActivated', {value:'false'});
    }
  }
  
  redirecToProfile(){
    this.router.navigate(['/profile'], {state: {user: this.userData}});
  }

  redirecToDriverForm(){
    this.router.navigate(['/form/conductor'], {state: {user: this.userData}});
  }

  cerrarSesion(){
    this.authService.signOut();
  }
}
