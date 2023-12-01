import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { HeaderComponent } from './components/base/header/header.component';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent]
})
export class AppComponent {
  
  constructor(private platform: Platform) {
  }
  
}
