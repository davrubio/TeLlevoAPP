import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { AdminComponent } from '../../components/dashboard/admin/admin.component';
import { DriverComponent } from '../../components/dashboard/driver/driver.component';
import { UserComponent } from '../../components/dashboard/user/user.component';
import { UserLocalData } from 'src/app/models/user/user.info';
import { HeaderComponent } from "../../components/base/header/header.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterOutlet, HeaderComponent]
})
export class HomePage implements OnInit {
  
  readonly titlePage = 'TeLlevoApp';

  userData: UserLocalData;
  
  constructor(private router: Router) {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }
  
  ngOnInit() {
  }

  subscribeToEmiter(component:any) {
    if(component instanceof AdminComponent || component instanceof DriverComponent || component instanceof UserComponent){
      component.userData = this.userData;
    }
  }

}
