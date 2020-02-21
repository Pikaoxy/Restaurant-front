import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Employe } from '../_models/employe';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardManagerService implements CanActivate {

  decodedToken: Employe = new Employe;
  helper = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate() {
    this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    if (this.decodedToken.statut=="Administrateur") {
      return true;
    }
    // Le navigate va changer la route courante instantanément
    this.router.navigate(['/accueil']);
    return false;
  }
}
