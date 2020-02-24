import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandeService } from '../_services/commande.service';
import { FactureService } from '../_services/facture.service';
import { Commande } from '../_models/commande';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Choix } from '../_models/choix';
import { ChoixService } from '../_services/choix.service';
import { MontantFacture } from '../_models/montantfacture';
import { Facture } from '../_models/facture';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})

export class FactureComponent implements OnInit {

  listeCommandes: Commande[] = [];
  listeCommandesFinale: Commande[] = [];
  listeChoix: Choix[] = [];

  displayedColumns: string[] = ['table', 'date', 'facture'];
  displayedColumnsCommande: string[] = ['quantite', 'libelle', 'prix', 'montant'];
  // Initialisation de la source de données
  dataSource = new MatTableDataSource<Commande>();
  dataSourceCommande = new MatTableDataSource<Choix>();

  date;
  dateDebut;
  id_commande: number;
  cetteCommande: Commande = new Commande;
  montantFacture: MontantFacture = new MontantFacture;
  total: number;
  newFacture: Facture = new Facture;
  id_facture: number;
  showCommande: Boolean = false;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private factureService: FactureService,
    private commandeService: CommandeService,
    private choixService: ChoixService,
    private datePipe: DatePipe) {
    this.getAll();
  }

  ngOnInit() {

  }

  getAll() {
    this.commandeService.getAll().subscribe(
      data => {
        this.listeCommandes = data;
        this.listeCommandes.forEach(element => {
          this.date = new Date(element.date);
          this.date.setHours(this.date.getHours() + 1);
          element.dateDebut = this.datePipe.transform(this.date, 'dd/MM/yyyy HH:mm');
        });
        this.dataSource = new MatTableDataSource(this.listeCommandes);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, col) => {
          if (col == 'table') {
            return data.table.numero;
          }
          else {
            return data[col];
          }
        }
      }
    );
  }


  afficherFacture(id) {
    this.id_commande=id;
    this.commandeService.getOne(id).subscribe(
      data => {
        this.cetteCommande=data;
        this.date = new Date(this.cetteCommande.date);
        console.log(this.date)
        this.date.setHours(this.date.getHours()+1);
        console.log(this.date)
        this.dateDebut = this.datePipe.transform(this.date, 'dd/MM/yyyy HH:mm');
        console.log(this.dateDebut)
        this.newFacture.commande = this.cetteCommande;
        this.commandeService.getMontantById(id).subscribe(
          data => {
            this.montantFacture = data;
            this.total = this.montantFacture.montantFacture;
            this.newFacture.montant = this.total;
            this.factureService.getByCommande(this.cetteCommande).subscribe(
              data => {
                if (data == null) {
                  this.factureService.addOne(this.newFacture).subscribe(
                    data => {
                      this.id_facture = data.idFacture;
                    }
                  );
                }
                else {
                  console.log("Facture déjà existante")
                  this.id_facture= data.idFacture;
                }
              }
            );
          }
        );
      }
    );
    this.choixService.getByIdCommande(id).subscribe(
      data => {
        this.listeChoix=data;
        this.dataSourceCommande = new MatTableDataSource(this.listeChoix);
      }
    );
    this.showCommande=true;

  }

}
