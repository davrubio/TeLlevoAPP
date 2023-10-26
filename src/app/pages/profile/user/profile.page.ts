import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../../components/base/header/header.component";
import { Router } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';
import { capitalizeString } from 'src/app/utils/formatter.string';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CareerService } from 'src/app/services/career/career.service';
import { UserService } from 'src/app/services/user/user.service';
import { CareerModel } from 'src/app/models/career/career.info';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, NgFor, MatInputModule,]
})
export class ProfilePage implements OnInit {

  readonly titlePage = 'Perfil Usuario';
  element = false;

  userData!: UserLocalData;
  schools: CareerModel[] = [];
  flagCareer = false;
  listCareersTmp: string[] = [];
  careerTmp: string;
  

  constructor(
    private router: Router, private careerService: CareerService, private userService: UserService
  ) {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
   }

  ngOnInit() {
  }

  getRoles(): string{
    var rolesUser: string = '';
    if(this.userData.userInfo != null){
      
      if(this.userData.userInfo.roles.length == 1)
        rolesUser = capitalizeString(this.userData.userInfo.roles[0]);
      else {
        var nbrSepString: number = this.userData.userInfo.roles.length -1
        this.userData.userInfo.roles.forEach(rol => {
          rolesUser += capitalizeString(rol)
          if(nbrSepString >= 1) {
            rolesUser += ' | ';
            nbrSepString--;
          }
        })
      }
    }
    return rolesUser;
  }

  getCareers(){
    this.careerService.getAllCareers();
  }

  changeLabel(){
    this.element = !this.element;
    this.careerService.getAllCareers().subscribe((resultado: any) => {
      this.schools = resultado as CareerModel[];
    });
  }

  isEditing(){
    return this.element;
  }

  saveUserInfo(){
    this.changeLabel();
    if(this.userData.userInfo)
      this.userData.userInfo.carreraUniv = this.careerTmp;
    this.userService.saveUser(this.userData.email, this.userData.userInfo!);

  }

  careerSelected(event: any){
    this.careerTmp = event.target.value;
  }

  schoolSelected(event: any){
    this.flagCareer = !this.flagCareer;
    this.listCareersTmp = event.target.value.carreras;
  }

  isEnableCareer(){
    return this.element && this.flagCareer;
    
  }
}
