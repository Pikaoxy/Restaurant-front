import { Component, OnInit } from '@angular/core';
import { TableService } from '../_services/table.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from '../_models/table';
import { Employe } from '../_models/employe';
import { EmployeService } from '../_services/employe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-table',
  templateUrl: './modifier-table.component.html',
  styleUrls: ['./modifier-table.component.css']
})
export class ModifierTableComponent implements OnInit {

  id_table: number;
  id_emp: number;
  newTable: Table = new Table;
  listeEmployes: Employe[] = [];

  constructor(private tableService: TableService,
    private employeService: EmployeService,
    private route: ActivatedRoute) { 
      this.id_table = parseInt(this.route.snapshot.paramMap.get('id'));
    }

  ngOnInit() {
    this.employeService.getAll().subscribe(
      data => {
        this.listeEmployes=data;
      }
    );
    this.tableService.getOne(this.id_table).subscribe(
      data => {
        this.newTable=data;
        this.id_emp=this.newTable.employe.idEmploye;
      }
    );
  }

  modifierTable() {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous modifier la table ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ajouter'
    }).then((result) => {
      if (result.value) {
        this.employeService.getOne(this.id_emp).subscribe(
          data => {
            this.newTable.employe=data;
            this.tableService.updateOne(this.id_table,this.newTable).subscribe(
              data => {
                Swal.fire(
                  'Ajouté !',
                  'Votre table a bien été modifiée.',
                  'success'
                );
              }
            );
          }
        )

      }
    });
  }

}
