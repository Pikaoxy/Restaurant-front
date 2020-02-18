import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../_models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Reservation[]>('http://localhost:8080/reservations').pipe();
  }

  getOne(id: number) {
    return this.http.get<Reservation>('http://localhost:8080/reservations/'+id).pipe();
  }

  addOne(reservation: Reservation) {
    return this.http.post("http://localhost:8080/reservations",reservation).pipe();
  }

  updateOne(id: number, reservation: Reservation) {
    return this.http.put('http://localhost:8080/reservations/'+id,reservation).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/reservations/'+id).pipe();
  }
}
