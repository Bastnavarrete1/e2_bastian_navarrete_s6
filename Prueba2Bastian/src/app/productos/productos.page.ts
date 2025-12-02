import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList} 
from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ApiService, ProductoApi } from '../services/api.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList
  ]
})
export class ProductosPage implements OnInit {

  productos: ProductoApi[] = [];
  cargando: boolean = false;
  error: string | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.error = null;
    this.api.getProductos().subscribe({
      next: (data) => {
        this.productos = data.slice(0, 10);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error en suscripcion de productos', err);
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  async verDetalle(producto: ProductoApi) {
    await Preferences.set({
      key: 'producto_seleccionado',
      value: JSON.stringify(producto)
    });
    this.router.navigate(['/detalle-producto']);
  }
}
