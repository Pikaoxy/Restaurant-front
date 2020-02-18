import { Component, OnInit } from '@angular/core';
import { Employe } from '../_models/employe';
import { EmployeService } from '../_services/employe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  newEmploye: Employe = new Employe;

  constructor(private employeService: EmployeService) { }

  ngOnInit() {
  }

  ajouterEmploye() {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous ajouter l'employé ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ajouter'
    }).then((result) => {
      if (result.value) {
        this.employeService.addOne(this.newEmploye).subscribe(
          data => {
            Swal.fire(
              'Ajouté !',
              'Votre employé a bien été ajouté.',
              'success'
            );
          }
        );
      }
    });
  }

}
