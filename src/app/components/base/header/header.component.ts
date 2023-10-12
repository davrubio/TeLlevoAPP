import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication/auth.service';
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

  constructor( authService: AuthService ) {
    super(authService);
  }

  ngOnInit() { }

}
