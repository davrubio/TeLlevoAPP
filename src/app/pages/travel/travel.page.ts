import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { UserModel } from 'src/app/models/user/UserModel';
import { Router, RouterOutlet } from '@angular/router';
import { UserComponent } from '../../components/travel/user/user.component';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterOutlet]
})
export class TravelPage implements OnInit {

  userInfo: UserModel | undefined;
  travelInfo: TravelModel | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.travelInfo = this.router.getCurrentNavigation()?.extras.state?.['travelInfo'];
  }

  subscribeToEmiter(component:any){
    component.userInfo = this.userInfo;
    if(component instanceof UserComponent){
      component.travel = this.travelInfo;
      component.driver = this.travelInfo?.conductor;
    }
  }
}
