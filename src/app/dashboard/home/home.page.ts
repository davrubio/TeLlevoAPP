import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterOutlet} from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterOutlet]
})
export class HomePage implements OnInit {

  userInfoSend: UserModel| undefined;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.userInfoSend = this.router.getCurrentNavigation()?.extras.state?.['user'];
    console.log(this.userInfoSend?.name);
  }


}
