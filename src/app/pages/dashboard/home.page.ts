import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterOutlet} from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';
import { AdminComponent } from '../../components/dashboard/admin/admin.component';
import { DriverComponent } from '../../components/dashboard/driver/driver.component';
import { UserComponent } from '../../components/dashboard/user/user.component';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterOutlet]
})
export class HomePage implements OnInit {

  userData: UserLocalData | undefined;

  constructor(
    private router: Router,
  ) { }
  
  ngOnInit() {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  subscribeToEmiter(component:any) {
    if(component instanceof AdminComponent || component instanceof DriverComponent || component instanceof UserComponent){

      component.userData = this.userData;
    }
  }

}
