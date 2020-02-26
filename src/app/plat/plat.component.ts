import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatService } from '../_services/plat.service';
import { Plat } from '../_models/plat';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {

  newPlat: Plat = new Plat;
  listeEntrees: Plat[] = [];
  listePlats: Plat[] = [];
  listeDesserts: Plat[] = [];
  listeBoissons: Plat[] = [];
  selected = new FormControl(0);
  modifPlat: Plat = new Plat;
  modif = new FormControl(0);

  

    // Initialisation des colonnes
    displayedColumns: string[] = ['nom', 'prix', 'stock', 'modifier'];
    // Initialisation de la source de données
    dataSourceEntrees = new MatTableDataSource<Plat>();
    dataSourcePlats = new MatTableDataSource<Plat>();
    dataSourceDesserts = new MatTableDataSource<Plat>();
    dataSourceBoissons = new MatTableDataSource<Plat>();

    tabs = ['0 - Entrées', '1 - Plats', '2 - Desserts', '3 - Boissons'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private platService: PlatService) { 
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this.platService.getByCategorie("Entrée").subscribe(
      data => {
        this.listeEntrees = data;
        console.log(this.listeEntrees)
        this.dataSourceEntrees = new MatTableDataSource(this.listeEntrees);
        this.dataSourceEntrees.sort = this.sort;
      }
    );
    this.platService.getByCategorie("Plat").subscribe(
      data => {
        this.listePlats = data;
        this.dataSourcePlats = new MatTableDataSource(this.listePlats);
        this.dataSourcePlats.sort = this.sort;
      }
    );
    this.platService.getByCategorie("Dessert").subscribe(
      data => {
        this.listeDesserts = data;
        this.dataSourceDesserts = new MatTableDataSource(this.listeDesserts);
        this.dataSourceDesserts.sort = this.sort;
      }
    );
    this.platService.getByCategorie("Boisson").subscribe(
      data => {
        this.listeBoissons = data;
        this.dataSourceBoissons = new MatTableDataSource(this.listeBoissons);
        this.dataSourceBoissons.sort = this.sort;
      }
    );

  }

  refresh() {
    this.platService.getByCategorie("Entrée").subscribe(
      data => {
        this.dataSourceEntrees.data = data;
      }
    );
    this.platService.getByCategorie("Plat").subscribe(
      data => {
        this.dataSourcePlats.data = data;
        
      }
    );
    this.platService.getByCategorie("Dessert").subscribe(
      data => {
        this.dataSourceDesserts.data = data;
      }
    );
    this.platService.getByCategorie("Boisson").subscribe(
      data => {
        this.dataSourceBoissons.data = data;
      }
    );
  }

  ajouterPlat() {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous ajouter le plat ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ajouter'
    }).then((result) => {
      if (result.value) {
        this.platService.addOne(this.newPlat).subscribe(
          data => {
            Swal.fire(
              'Ajouté !',
              'Votre plat a bien été ajouté.',
              'success'
            );
            this.refresh();
          }
        );
      }
    });
  }

  modifierPlat(id) {
    this.modif.setValue(1);

    this.platService.getOne(id).subscribe(
      data => {
        this.modifPlat = data;
      }
    );
  }

  modificationPlat() {
    console.log(this.modifPlat)
    this.platService.updateOne(this.modifPlat.idPlat,this.modifPlat).subscribe(
      data => {
        this.refresh();
        this.modif.setValue(0);
      }
    );
  }

  supprimerPlat(id) {
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez-vous supprimer ce choix ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF0909',
      cancelButtonColor: '#D7D7D7',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.refresh();
        this.platService.deleteOne(id).subscribe(
          data => {
            this.refresh();
            if (data == true) {
              Swal.fire(
                'Réussite !',
                'Votre choix a bien été supprimé.',
                'success'
              );
            }
            else {
              Swal.fire(
                'Echec...',
                "Votre choix n'a pas pu être supprimé.",
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
