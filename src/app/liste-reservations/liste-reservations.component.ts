import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ReservationService } from '../_services/reservation.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Reservation } from '../_models/reservation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-reservations',
  templateUrl: './liste-reservations.component.html',
  styleUrls: ['./liste-reservations.component.css']
})
export class ListeReservationsComponent implements OnInit {

  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    /*     { title: 'Event Now', start: new Date() } */
  ];
  calendarTimeZone = 'Europe/Paris';
  calendarDroppable = true;
  calendarMinTime = '10:00:00';
  calendarEventSources = this
  calendarEventSlotDuration = '01:00:00';
  calendarContentHeight = '600';
  calendarHeight = '600';

  listeReservations: Reservation[] = [];
  event: EventInput;
  titre: string;
  newDateDebut: Date = new Date();
  newDateFin: Date = new Date();
  heureDebut;
  modifResa: Reservation = new Reservation;
  calendarButtons: Object[] = [];
  options;
  iconHtml: string = '<fa-icon [icon]="faTimes"></fa-icon>';
  icone: string = "times";


  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getAll().subscribe(
      data => {
        this.listeReservations = data;
        this.listeReservations.forEach(element => {
          console.log(element)
          this.titre = element.client.nom.concat(" ", element.client.prenom,"\n", "Table n°", element.table.numero.toString())
          console.log(this.titre)
          this.newDateDebut = new Date(element.dateDebut);
          this.newDateDebut.setHours(this.newDateDebut.getHours() + 1);
          this.newDateFin = new Date(element.dateFin);
          this.newDateFin.setHours(this.newDateFin.getHours() + 1);

          this.calendarEvents = this.calendarEvents.concat({
            id: element.idReservation,
            title: this.titre,
            start: this.newDateDebut,
            end: this.newDateFin,
            icon: this.icone
          });
        });
/*         this.calendarEvents.forEach(element => {
          element.event.icon = this.iconHtml;
        }); */
      }
    );
  }

  afficherIcone($event) {

  }

  eventClick($event) {

  }

  modifierHeureEvent($event) {
    console.log($event);
    console.log($event.event.id)
    this.reservationService.getOne($event.event.id).subscribe(
      data => {
        this.modifResa = data;
        this.modifResa.dateDebut = $event.event.start;
        this.modifResa.dateFin = $event.event.end;
        console.log(this.modifResa.dateDebut)
        console.log(this.modifResa.dateFin)
        this.reservationService.updateOne($event.event.id, this.modifResa).subscribe(
          data => {

          }
        );
      }
    );
  }

  deleteEvent($event) {
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
        this.reservationService.deleteOne($event.event.id).subscribe(
          data => {
            if (data == true) {
              Swal.fire(
                'Réussite !',
                'Votre choix a bien été supprimé.',
                'success'
              );
              $event.event.remove();
            }
            else {
              Swal.fire(
                'Echec...',
                "Votre choix n'a pas pu être supprimé.",
                'error'
              );
            }
          }     
        )
      }
    });
  }

  supprimerEvent($event) {         
      $event.event.find(".fc-title").prepend('<fa-icon [icon]="faTimes"></fa-icon>');
  }


}
