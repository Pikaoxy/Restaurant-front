import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../_services/table.service';
import { Table } from '../_models/table';
import Swal from 'sweetalert2'

// Imports Angular Material

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-liste-tables',
  templateUrl: './liste-tables.component.html',
  styleUrls: ['./liste-tables.component.css']
})
export class ListeTablesComponent implements OnInit {

  listeTables: Table[] = [];

  // Initialisation des colonnes
  displayedColumns: string[] = ['numero', 'nbPlaces', 'employeNom','employePrenom','modifier'];
  // Initialisation de la source de données
  dataSource = new MatTableDataSource<Table>();
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private tableService: TableService) {
    this.getAll();
   }

  ngOnInit() {
  }

  getAll() {
    this.tableService.getAll().subscribe(
      data => {
        this.listeTables = data;
        this.dataSource = new MatTableDataSource(this.listeTables);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, col) => {
          if (col == 'employeNom') {
            return data.employe.nom;
          } 
          else if (col == 'employePrenom') {
            return data.employe.prenom;
          }
          else {
            return data[col];
          }
        };
      });
  }

  refresh() {
    this.tableService.getAll().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

  supprimerTable(id) {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous supprimer cette table ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF0909',
      cancelButtonColor: '#D7D7D7',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.refresh();
        this.tableService.deleteOne(id).subscribe(
          data => {
            this.refresh();
            if (data == true) {
              Swal.fire(
                'Réussite !',
                'Votre table a bien été supprimée.',
                'success'
              );
            }
            else {
              Swal.fire(
                'Echec...',
                "Votre table n'a pas pu être supprimée.",
                'error'
              );
            }
          }
        );
      }
    }
    );
  }

}
