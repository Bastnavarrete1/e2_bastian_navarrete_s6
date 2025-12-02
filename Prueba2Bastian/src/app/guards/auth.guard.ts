import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const session = await Preferences.get({ key: 'usuario' });

    if (!session.value) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
