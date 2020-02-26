import { Component, OnInit } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';
import { Reservation } from '../_models/reservation';
import { ReservationService } from '../_services/reservation.service';
import { Table } from '../_models/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  newClient: Client = new Client;
  newReservation: Reservation = new Reservation;
  date: Date = new Date;
  heure: Date = new Date;
  nbCli: number;
  dateResaDebut: Date;
  dateResaFin: Date;
  formulaire: Boolean = false;
  listeTables: Table[] = [];
  listeResa: Reservation[] = [];
  id_cli: number;

  constructor(private clientService: ClientService,
    private reservationService: ReservationService) { }

  ngOnInit() {
  }

  afficherFormu() {
    this.formulaire = true;
  }

  ajouterResa() {
    this.dateResaDebut = new Date(this.date + ' ' + this.heure);
    this.dateResaFin = new Date(this.date + ' ' + this.heure + 59);
    console.log(this.dateResaDebut)
    console.log(this.dateResaFin)
    console.log(this.newClient)
    this.newReservation.dateDebut = this.dateResaDebut;
    this.newReservation.dateFin = this.dateResaFin;
    this.newReservation.nbClients = this.nbCli;
    this.reservationService.getTablesDispoByDate(this.dateResaDebut).subscribe(
      data => {
        console.log(data)
        if (data.length != 0) {
          this.listeTables = data.filter(x => x.nbPlaces >= this.nbCli);
          console.log(this.listeTables)
          if (this.listeTables.length != 0) {
            this.newReservation.table = this.listeTables[0];
            console.log(this.newReservation.table)
            this.clientService.getByTel(this.newClient.tel).subscribe(
              data => {
                if (data == null) {
                  this.clientService.addOne(this.newClient).subscribe(
                    data => {
                      this.clientService.getByTel(this.newClient.tel).subscribe(
                        data => {
                          this.newReservation.client = data;
                          this.reservationService.addOne(this.newReservation).subscribe(
                            data => {
                              Swal.fire({
                                title: 'Bien joué !',
                                text: 'Réservation réussie !',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                              }).then(function() {
                                window.location.href = "http://localhost:4200/accueil";
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                }
                else {
                  this.newReservation.client = data;
                  this.id_cli = this.newReservation.client.idClient;
                  this.reservationService.getByDate(this.dateResaDebut).subscribe(
                    data => {
                      this.listeResa = data.filter(x => x.client.idClient == this.id_cli);
                      if (this.listeResa.length == 0) {
                        this.reservationService.addOne(this.newReservation).subscribe(
                          data => {
                            Swal.fire({
                              title: 'Bien joué !',
                              text: 'Réservation réussie !',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 1500,
                            }).then(function() {
                              window.location.href = "http://localhost:4200/accueil";
                            });
                          }
                        );
                      }
                      else {
                        console.log("Vous ne pouvez réserver qu'une seule table pour un créneau donné")
                        Swal.fire(
                          'Dommage !',
                          "Vous ne pouvez réserver qu'une seule table pour un créneau...",
                          'error'
                        );
                      }
                    }
                  );
                }
              }
            );
          }
          else {
            console.log("Il n'y a plus de table disponible pour ce nombre de personnes")
            Swal.fire(
              'Dommage !',
              "Il n'y a plus de table disponible pour ce nombre de personnes...",
              'error'
            );
          }
        }
        else {
          console.log("Il n'y a plus de table disponible pour ce créneau")
          Swal.fire(
            'Dommage !',
            "Il n'y a plus de table disponible pour ce créneau...",
            'error'
          );
        }
      }
    );
  }

}
