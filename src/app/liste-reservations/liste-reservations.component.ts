import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ReservationService } from '../_services/reservation.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Reservation } from '../_models/reservation';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-liste-reservations',
  templateUrl: './liste-reservations.component.html',
  styleUrls: ['./liste-reservations.component.css']
})
export class ListeReservationsComponent implements OnInit {

  @ViewChild('calendar',{static: true}) calendarComponent: FullCalendarComponent; // the #calendar in the template

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
  
  listeReservations: Reservation[] = [];
  event: EventInput;
  titre: string;
  newDateDebut;
  newDateFin;
  heureDebut;

  options;


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
        this.listeReservations=data;
        this.listeReservations.forEach(element => {
          console.log(element)
          this.titre = element.client.nom.concat(" ",element.client.prenom)
          console.log(this.titre)
          this.newDateDebut = element.dateDebut;  /* formatDate(element.dateDebut,'yyyy-MM-dd HH:mm','UTC+1'); */
          this.newDateFin = element.dateFin; /* formatDate(element.dateFin,'yyyy-MM-dd HH:mm','UTC+1'); */
          this.calendarEvents=this.calendarEvents.concat({
            id: element.idReservation,
            title: this.titre,
            start: this.newDateDebut,
            end: this.newDateFin
            })
            console.log(this.calendarEvents)
        });
      

      }
    )

    this.options = {
      customButtons: { 
        test:{
          text:"click for Now",
          click: function(){
            this.calendarComp.getNow();  //Example function present in Main.d.ts of Fullcalendar/core
          }
        }
      }
    }

    
    
  }

  deleteEventClick() {
    if (this.event.id) {
      alert(this.event.id)
    }
/*     if (confirm('Voulez-vous supprimer cet événement ?')) {
      this.calendarComponent.
    } */
  }


}
