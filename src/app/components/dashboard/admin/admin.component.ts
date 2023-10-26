import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DriverRequest } from 'src/app/models/driver/form.info';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';
import { FormService } from 'src/app/services/form/form.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule,]
})
export class AdminComponent  implements OnInit {

  userData!: UserLocalData;

  listRequests: DriverRequest[] = [];

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
      },
    },
  ];

  constructor(
    private router: Router,
    private formService: FormService,
    private userService: UserService,
  ) {
    formService.getAllRequests().subscribe(resultado => {
      this.listRequests = resultado as DriverRequest[]; 
    })
  }

  ngOnInit() { }

  resultOperation(event: any, request: DriverRequest){
    switch (event.detail.data.id) {
      case 1:
        request.emailReviewer = this.userData.email;
        request.emailApprover = this.userData.email;
        request.statusRequest = event.detail.data.id;
        this.updateStudentInfo(request);        
        break;
      case 2:
        request.emailReviewer = this.userData.email;
        request.emailApprover = this.userData.email;
        request.statusRequest = event.detail.data.id;

        break;
      case 3:
        request.emailReviewer = this.userData.email;
        break;
    }

    this.formService.updateRequest(request);
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
}
