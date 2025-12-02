import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel } 
from '@ionic/angular/standalone';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel
  ]
})
export class CarritoPage implements OnInit {
  
  usuario = "Bastian Navarrete";
  total = 38980;
  cantidadProductos = 2;
  fecha = new Date().toLocaleDateString();
  
  calcularTotal() {
    return this.total;
  }
  
  obtenerMensaje() {
    return `Tienes ${this.cantidadProductos} productos en tu carrito`;
  }

  constructor() {}
  ngOnInit() {}
}