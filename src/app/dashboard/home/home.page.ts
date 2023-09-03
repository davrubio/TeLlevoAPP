import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterOutlet} from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';
import { AdminComponent } from '../components/admin/admin.component';
import { DriverComponent } from '../components/driver/driver.component';
import { UserComponent } from '../components/user/user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterOutlet]
})
export class HomePage implements OnInit {

  userInfo: UserModel | undefined;

  constructor(
    private router: Router,
  ) { }
  
  ngOnInit() {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  subscribeToEmiter(component:any) {
    if(component instanceof AdminComponent || component instanceof DriverComponent || component instanceof UserComponent){

      component.userInfo = this.userInfo;
    }
  }

}
