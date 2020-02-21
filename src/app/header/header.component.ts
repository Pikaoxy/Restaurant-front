import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employe } from '../_models/employe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLogin: Boolean;
  showAdmin: Boolean = false;
  helper = new JwtHelperService();
  decodedToken: Employe = new Employe;

  constructor() { }

  ngOnInit() {
    if (localStorage.length==0) {
      this.showLogin = true;
    }
    else {
      this.showLogin = false;
      this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
      if (this.decodedToken.statut=="Administrateur") {
        this.showAdmin = true;
      }
    }
  }

  deconnexion() {
    localStorage.removeItem('token');
  }

}
