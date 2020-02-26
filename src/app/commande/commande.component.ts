import { Component, OnInit } from '@angular/core';
import { PlatService } from '../_services/plat.service';
import { CommandeService } from '../_services/commande.service';
import { Plat } from '../_models/plat';
import { ChoixService } from '../_services/choix.service';

import { MatTableDataSource } from '@angular/material/table';
import { Choix } from '../_models/choix';
import { Table } from '../_models/table';
import { Commande } from '../_models/commande';
import { CommandeResa } from '../_models/commanderesa';
import { TableService } from '../_services/table.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  listeEntrees: Plat[] = [];
  listePlatsRes: Plat[] = [];
  listeDesserts: Plat[] = [];
  listeBoissons: Plat[] = [];
  listeTables: Table[] = [];
  id_table: number;
  table: Table = new Table;
  date: Date;
  heure: Date;
  creneau: Date;
  unChoix: Choix = new Choix;
  newCommande: Commande = new Commande;
  cetteCommande: Commande = new Commande;
  infoCommande: CommandeResa = new CommandeResa;
  showValider: Boolean = true;
  showCommande: Boolean = false;
  cePlat: Plat = new Plat;

  testDate: Date;
  testDate2: Date;

  // Initialisation des colonnes
  displayedColumns: string[] = ['plat', 'qte', 'supprimer'];
  // Initialisation de la source de données
  dataSource = new MatTableDataSource<Choix>();

  refresh() {
    this.choixService.getByCommande(this.cetteCommande).subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

  constructor(private platService: PlatService,
    private commandeService: CommandeService,
    private choixService: ChoixService,
    private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getAll().subscribe(
      data => {
        this.listeTables = data;
      }
    );
    this.platService.getByCategorie("Entrée").subscribe(
      data => {
        this.listeEntrees = data;
      }
    );
    this.platService.getByCategorie("Plat").subscribe(
      data => {
        this.listePlatsRes = data;
      }
    );
    this.platService.getByCategorie("Dessert").subscribe(
      data => {
        this.listeDesserts = data;
      }
    );
    this.platService.getByCategorie("Boisson").subscribe(
      data => {
        this.listeBoissons = data;
      }
    );
  }

  testerDate() {
    console.log(this.testDate)
    console.log(this.testDate.getDate())
    console.log(this.testDate.getMonth()+1)
    console.log(this.testDate.getFullYear())
    var dateMois = this.testDate.getMonth()+1;
    console.log(new Date(this.testDate.getFullYear()+'-'+dateMois+'-'+this.testDate.getDate()))
    console.log(this.testDate2)
  }


  createCommande() {
    this.tableService.getOne(this.id_table).subscribe(
      data => {
        this.table = data;
        this.newCommande.table = this.table;
        var dateMois = this.date.getMonth()+1;
        this.creneau = new Date(this.date.getFullYear()+'-'+dateMois+'-'+this.date.getDate() + ' ' + this.heure);
        this.newCommande.date = this.creneau;
        console.log(this.newCommande)
        this.infoCommande.date = this.creneau;
        this.infoCommande.table = this.table;
        this.commandeService.getOneByTableAndDate(this.infoCommande).subscribe(
          data => {
            if (data == null) {
              this.commandeService.addOne(this.newCommande).subscribe(
                data => {

                  this.commandeService.getOneByTableAndDate(this.infoCommande).subscribe(
                    data => {
                      console.log(data)
                      this.cetteCommande = data;
                      this.choixService.getByCommande(this.cetteCommande).subscribe(
                        data => {
                          this.dataSource.data = data;
                        }
                      );
                    }
                  );
                }
              );
            }
            else {
              console.log("Commande déjà existante");
              console.log(data)
              this.cetteCommande = data;
              this.choixService.getByCommande(this.cetteCommande).subscribe(
                data => {
                  this.dataSource.data = data;
                }
              );
            }
          }
        );
      }
    );
    this.showValider = false;
    this.showCommande = true;
  }

  cancelCommande() {
    this.showValider = true;
    this.showCommande = false;
  }

  addChoix(id, nb) {
    this.creneau = new Date(this.date + ' ' + this.heure);
    this.infoCommande.date = this.creneau;
    this.infoCommande.table = this.table;
    console.log(this.infoCommande)
    this.commandeService.getOneByTableAndDate(this.infoCommande).subscribe(
      data => {
        this.cetteCommande = data;
        console.log(this.cetteCommande)
        this.platService.getOne(id).subscribe(
          data => {
            this.cePlat = data;
            this.unChoix.plat = this.cePlat;
            this.unChoix.nbPlat = nb;
            this.unChoix.commande = this.cetteCommande;
            this.unChoix.montantChoix = this.cePlat.prix*nb;
            console.log(this.unChoix)
            this.choixService.addOne(this.unChoix).subscribe(
              data => {
                this.cePlat.stock = this.cePlat.stock - nb;
                console.log(this.cePlat.stock)
                this.platService.updateOne(id, this.cePlat).subscribe(
                  data => {
                    this.refresh();
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  supprimerChoix(id, nb) {
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
        this.choixService.getOne(id).subscribe(
          data => {
            this.platService.getOne(data.plat.idPlat).subscribe(
              data => {
                data.stock = data.stock + nb;
                console.log(data.stock)
                this.platService.updateOne(data.idPlat, data).subscribe(
                  data => {
                    this.choixService.deleteOne(id).subscribe(
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
                );
              }
            );
          }
        );
      }
    }
    );
  }


}
