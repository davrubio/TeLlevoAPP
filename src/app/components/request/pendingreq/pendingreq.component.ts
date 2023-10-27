import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DriverRequest } from 'src/app/models/driver/form.info';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';
import { FormService } from 'src/app/services/form/form.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-pendingreq',
  templateUrl: './pendingreq.component.html',
  styleUrls: ['./pendingreq.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ]
})
export class PendingreqComponent  implements OnInit {

  userData: UserLocalData;
  requestInfo: DriverRequest;

  actionSheetButtons = [
    {
      text: 'Aceptar',
      data: {
        action: 'Aceptar',
        id: 1,
      },
    },
    {
      text: 'En Revision',
      data: {
        action: 'En Revision',
        id: 2,
      },
    },
    {
      text: 'Rechazar',
      role: 'destructive',
      data: {
        action: 'Rechazar',
        id: 2,
      },
    },
    {
      text: 'Salir',
      role: 'cancel',
      data: {
        action: 'cancel',
        id: 9,
      },
    },
  ];

  constructor(
    private router: Router,
    private formService: FormService,
    private userService: UserService,
  ) { }

  ngOnInit() {}

  resultOperation(event: any){

    if(event.detail.data != null || event.detail.data) {
      switch (event.detail.data.id) {
        case 1:
          this.requestInfo.emailReviewer = this.userData.email;
          this.requestInfo.emailApprover = this.userData.email;
          this.requestInfo.statusRequest = event.detail.data.id;
          this.updateStudentInfo(this.requestInfo);        
          this.formService.updateRequest(this.requestInfo);
          this.router.navigate(['dash/admin'], {state: {user: this.userData}});

          break;
        case 2:
          this.requestInfo.emailReviewer = this.userData.email;
          this.requestInfo.emailApprover = this.userData.email;
          this.requestInfo.statusRequest = event.detail.data.id;
          this.formService.updateRequest(this.requestInfo);
          this.router.navigate(['dash/admin'], {state: {user: this.userData}});

          break;
        case 3:
          this.requestInfo.emailReviewer = this.userData.email;
          this.formService.updateRequest(this.requestInfo);
          this.router.navigate(['dash/admin'], {state: {user: this.userData}});

          break;
        default:
          break;
      }
    }
  } 


  updateStudentInfo(request: DriverRequest){
    let studentData: UserInfo;
    
    this.userService.getUser(request.emailStudent).
      then(result => {
        if(result.exists()){
          studentData = result.data() as UserInfo;

          studentData.vehiculo = request.vehicleStudent;
          studentData.roles.push('driver');
          this.userService.saveUser(request.emailStudent, studentData);
        }
      }).catch(error => {
        console.log('Error en updateStudentInfo -> AdminComponent -> Dashboard: ',error);
      });
  }

  getEstado(): string{
    switch (this.requestInfo.statusRequest) {
      case 1:
        return 'Aceptada';
      case 2:
          return 'Rechazada';
      case 3:
        return 'En Revisión';
      default:
        return 'En Espera';
    }
  }
}
