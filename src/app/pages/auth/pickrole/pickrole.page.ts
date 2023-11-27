import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';
import { HeaderComponent } from "../../../components/base/header/header.component";
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
    selector: 'app-pickrole',
    templateUrl: './pickrole.page.html',
    styleUrls: ['./pickrole.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export class PickrolePage implements OnInit {

  readonly titlePage = 'Roles';

  userData: UserLocalData | undefined;

  constructor(
    private router: Router,
    private manageLocalData : UtilsService
  ) { }

  ngOnInit() {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  redirectToPage(role:string){
    if(this.userData){
      this.userData.rolActivo = role;
      this.manageLocalData.saveLocalStorage('userdata', this.userData);
    }

    let url = '/dash/'+role;
    this.router.navigate([url], {state:{user:this.userData}});
  }
}
