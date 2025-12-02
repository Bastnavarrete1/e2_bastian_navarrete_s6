import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput
} from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput
  ]
})
export class LoginPage implements OnInit {

  usuario: string = '';
  clave: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  async login() {
    if (!this.usuario || !this.clave) {
      alert('Ingresa usuario y contraseña');
      return;
    }

    if (this.usuario === 'admin' && this.clave === '123') {
      await Preferences.set({
        key: 'usuario',
        value: JSON.stringify({ usuario: this.usuario })
      });

      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrectos. Usa admin / 123');
    }
  }
}
