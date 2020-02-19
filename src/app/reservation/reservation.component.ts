import { Component, OnInit } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';
import { Reservation } from '../_models/reservation';
import { ReservationService } from '../_services/reservation.service';

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
  formulaire: Boolean = false;$

  clientTel: Client = new Client;

  constructor(private clientService: ClientService,
    private reservationService: ReservationService) { }

  ngOnInit() {
  }

  afficherFormu() {
    this.formulaire=true;
  }

  ajouterResa() {
    console.log(this.date)
    console.log(this.heure)
    console.log(this.nbCli)

    this.dateResaDebut = new Date(this.date+' '+this.heure);
    this.dateResaFin = new Date(this.date+' '+this.heure+59);
    console.log(this.dateResaDebut)
    console.log(this.dateResaFin)
    console.log(this.newClient)
    this.clientService.addOne(this.newClient).subscribe(
      data => {
        this.clientService.getByTel(this.newClient.tel).subscribe(
          data => {
            this.clientTel=data;
            this.newReservation.dateDebut=this.dateResaDebut;
            this.newReservation.dateFin=this.dateResaFin;
            this.newReservation.nbClients=this.nbCli;
            this.newReservation.client=this.clientTel;
            console.log(this.newReservation)
            this.reservationService.addOne(this.newReservation).subscribe(
              data => {
        
              }
            );
          }
        );
      }
    );

  }

}
