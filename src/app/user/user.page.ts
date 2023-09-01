import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from '../models/UserModels';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserPage implements OnInit {

  userInfoReceived: UserModel | undefined;

  constructor(private router: Router) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  ngOnInit() {
  }

}
