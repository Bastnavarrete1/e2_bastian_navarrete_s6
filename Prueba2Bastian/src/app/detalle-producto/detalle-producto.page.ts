import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { ProductoApi } from '../services/api.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ]
})
export class DetalleProductoPage implements OnInit {

  producto: ProductoApi | null = null;

  constructor() {}

  async ngOnInit() {
    const stored = await Preferences.get({ key: 'producto_seleccionado' });
    if (stored.value) {
      try {
        this.producto = JSON.parse(stored.value) as ProductoApi;
      } catch (e) {
        console.error('No se pudo cargar el producto seleccionado', e);
      }
    }
  }
}
