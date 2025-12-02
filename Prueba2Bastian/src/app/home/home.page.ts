import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  latitud: number | null = null;
  longitud: number | null = null;
  errorGeo: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('HomePage cargo correctamente');
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'usuario' });
    this.router.navigate(['/login']);
  }

  async obtenerUbicacion() {
    this.errorGeo = null;
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
    } catch (err: any) {
      console.error('Error obteniendo ubicacion', err);
      this.errorGeo = 'No se pudo obtener la ubicacion. Verifica permisos o conexion.';
    }
  }
}
