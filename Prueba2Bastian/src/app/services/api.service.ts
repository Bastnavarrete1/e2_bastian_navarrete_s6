import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

export interface ProductoApi {
  userId?: number;
  id: number;
  title: string;
  body?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly URL = 'https://jsonplaceholder.typicode.com/posts';
  private readonly CACHE_KEY = 'productos_cache';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<ProductoApi[]> {
    return this.http.get<ProductoApi[]>(this.URL).pipe(
      tap(async data => {
        await Preferences.set({
          key: this.CACHE_KEY,
          value: JSON.stringify(data)
        });
      }),
      catchError(err => {
        console.error('Error al consultar API, intentando leer desde caché', err);
        return this.getProductosDesdeCache();
      })
    );
  }

  private getProductosDesdeCache(): Observable<ProductoApi[]> {
    return new Observable<ProductoApi[]>(observer => {
      Preferences.get({ key: this.CACHE_KEY }).then(stored => {
        if (stored.value) {
          try {
            const parsed = JSON.parse(stored.value) as ProductoApi[];
            observer.next(parsed);
          } catch (e) {
            console.error('No se pudo cargar el caché del producto seleccionado', e);
            observer.next([]);
          }
        } else {
          observer.next([]);
        }
        observer.complete();
      }).catch(err => {
        console.error('Error leyendo caché de productos', err);
        observer.next([]);
        observer.complete();
      });
    });
  }
}
