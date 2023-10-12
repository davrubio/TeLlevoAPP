import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';

@Component({
  selector: 'app-driver-dash',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DriverComponent  implements OnInit {

  userData: UserLocalData | undefined;
  
  constructor(private router: Router) { }

  ngOnInit() { }

  regTravel(){
    this.router.navigate(['/travel/'+this.userData?.rolActivo], {state:{user: this.userData}});
  }
  
}
