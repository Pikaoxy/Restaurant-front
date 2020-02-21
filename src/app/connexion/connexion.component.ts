import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../_services/employe.service';
import { Employe } from '../_models/employe';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  login: String;
  mdp: String;
  newEmploye: Employe = new Employe;
  tokenEmp;
  decodedToken;
  helper = new JwtHelperService();

  constructor(private employeService: EmployeService) { }

  ngOnInit() {
  }

  connexionV2() {
    this.newEmploye.login = this.login;
    this.newEmploye.mdp = this.mdp;
    this.employeService.getTokenByLogin(this.newEmploye).subscribe(
      data => {
        if (data != null) {
          this.tokenEmp=data['token'];
          localStorage.setItem('token',this.tokenEmp);
          this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
          console.log(this.decodedToken)
          console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'Vous êtes maintenant connecté(e)',
            showConfirmButton: true,
            showCloseButton: false,
          }).then(function () {
            window.location.href = "/accueil";
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login et/ou mot de passe incorrects',
            showConfirmButton: false,
            showCloseButton: true,
          }).then(function () {
            window.location.href = "/connexion";
          });
        }
      }
    );
  }
}
