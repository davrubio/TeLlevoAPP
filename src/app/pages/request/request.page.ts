import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../components/base/header/header.component";
import { PendingreqComponent } from 'src/app/components/request/pendingreq/pendingreq.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';
import { DriverRequest } from 'src/app/models/driver/form.info';

@Component({
    selector: 'app-request',
    templateUrl: './request.page.html',
    styleUrls: ['./request.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, RouterOutlet]
})
export class RequestPage implements OnInit {

  readonly titlePage = 'Detalle Solicitud';

  userData: UserLocalData;
  requestInfo: DriverRequest;

  constructor(
    private router: Router,
  ) {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.requestInfo = this.router.getCurrentNavigation()?.extras.state?.['request'];
   }

  ngOnInit() {
  }

  subscribeToEmiter(component:any) {
    if(component instanceof PendingreqComponent){
      component.userData = this.userData;
      component.requestInfo = this.requestInfo;
    }
  }

}
