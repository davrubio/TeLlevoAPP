import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DriverRequest } from 'src/app/models/driver/form.info';
import { UserLocalData } from 'src/app/models/user/user.info';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, ]
})
export class AdminComponent  implements OnInit {

  userData: UserLocalData;

  listRequests: DriverRequest[] = [];

  //RESUMEN PETICIONES
  quantityAll: number = 0;
  quantityAcepted: number = 0;
  quantityRejected: number = 0;

  constructor(
    private router: Router,
    private formService: FormService,
  ) {
    // formService.getAllRequests().subscribe(resultado => {
    //   this.listRequests = resultado as DriverRequest[]; 
    // });

    formService.getAllRequests().then( result => this.quantityAll = result.size ).catch( error => console.log(error) );
    formService.getAllAcceptedRequests().then( result => this.quantityAcepted = result.size ).catch( error => console.log(error) );
    formService.getAllRejectedRequests().then( result => this.quantityRejected = result.size ).catch( error => console.log(error) );
    formService.getAllPendsRequests().then( result => {
      result.forEach( data => this.listRequests.push(data.data() as DriverRequest));
    }).catch( error => console.log(error) );
  }

  ngOnInit() { }

  redirectChild(request: DriverRequest){
    this.router.navigate(['/request/pending'],{state:{user:this.userData, request: request}});
  }

}
