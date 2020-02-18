import { Component, OnInit } from '@angular/core';
import { TableService } from '../_services/table.service';
import { EmployeService } from '../_services/employe.service';
import { Employe } from '../_models/employe';
import { Table } from '../_models/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  listeEmployes: Employe[] = [];
  newTable: Table = new Table;
  id_emp: number;

  constructor(private tableService: TableService,
    private employeService: EmployeService) { }

  ngOnInit() {
    this.employeService.getAll().subscribe(
      data => {
        this.listeEmployes=data;
      }
    )
  }

  ajouterTable() {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous ajouter la table ?",
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
            this.tableService.addOne(this.newTable).subscribe(
              data => {
                Swal.fire(
                  'Ajouté !',
                  'Votre table a bien été ajoutée.',
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
