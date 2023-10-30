import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent extends ManageSession implements OnInit {

  @Input({required:true})
  titlePage!: string;

  userData: UserLocalData;

  constructor( 
    authService: AuthService,
    private carService: APICarService,
    private router: Router, 
  ) {
    super(authService);
    this.userData = ManageLocalData.getLocalData();
  }

  ngOnInit() { }

  redirecToProfile(){
    this.router.navigate(['/profile'], {state: {user: this.userData}});
  }

  redirecToDriverForm(){
    this.router.navigate(['/form/driver'], {state: {user: this.userData}});
  }
  
}
