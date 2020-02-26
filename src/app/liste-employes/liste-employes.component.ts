import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeService } from '../_services/employe.service';

// Imports Angular Material

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employe } from '../_models/employe';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-employes',
  templateUrl: './liste-employes.component.html',
  styleUrls: ['./liste-employes.component.css']
})
export class ListeEmployesComponent implements OnInit {

  listeEmployes: Employe[] = [];

  // Initialisation des colonnes
  displayedColumns: string[] = ['nom', 'prenom', 'statut','modifier'];
  // Initialisation de la source de données
  dataSource = new MatTableDataSource<Employe>();
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private employeService: EmployeService) { 
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this.employeService.getAll().subscribe(
      data => {
        this.listeEmployes = data;
        this.dataSource = new MatTableDataSource(this.listeEmployes);
        this.dataSource.sort = this.sort;
      });
  }

  refresh() {
    this.employeService.getAll().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

  supprimerEmploye(id) {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous supprimer cet employé ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF0909',
      cancelButtonColor: '#D7D7D7',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.refresh();
        this.employeService.deleteOne(id).subscribe(
          data => {
            this.refresh();
            if (data == true) {
              Swal.fire(
                'Réussite !',
                'Votre employé a bien été supprimé.',
                'success'
              );
            }
            else {
              Swal.fire(
                'Echec...',
                "Votre employé n'a pas pu être supprimé.",
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
