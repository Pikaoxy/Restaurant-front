import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../_services/table.service';
import { Table } from '../_models/table';

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

}
