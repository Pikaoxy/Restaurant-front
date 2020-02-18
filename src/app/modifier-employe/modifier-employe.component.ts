import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../_services/employe.service';
import { ActivatedRoute } from '@angular/router';
import { Employe } from '../_models/employe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent implements OnInit {

  id_emp: number;
  newEmploye: Employe = new Employe;

  constructor(private employeService: EmployeService,
    private route: ActivatedRoute) { 
      this.id_emp = parseInt(this.route.snapshot.paramMap.get('id'));
    }

  ngOnInit() {
    this.employeService.getOne(this.id_emp).subscribe(
      data => {
        this.newEmploye=data;
      }
    );
  }

  modifierEmploye() {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous modifier l'employé ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ajouter'
    }).then((result) => {
      if (result.value) {
        this.employeService.updateOne(this.id_emp,this.newEmploye).subscribe(
          data => {
            Swal.fire(
              'Ajouté !',
              'Votre employé a bien été modifié.',
              'success'
            );
          }
        );
      }
    });
  }

}
