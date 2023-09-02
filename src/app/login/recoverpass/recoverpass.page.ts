import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecoverpassPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
