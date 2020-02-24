import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from '../_models/facture';
import { pipe } from 'rxjs';
import { Commande } from '../_models/commande';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Facture[]>('http://localhost:8080/factures').pipe();
  }

  getOne(id: number) {
    return this.http.get<Facture>('http://localhost:8080/factures/'+id).pipe();
  }

  addOne(facture: Facture) {
    return this.http.post<Facture>("http://localhost:8080/factures",facture).pipe();
  }
  
  updateOne(id: number, facture: Facture) {
    return this.http.put('http:///localhost:8080/factures/'+id,facture).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete<String>('http://localhost:8080/factures/'+id).pipe();
  }

  getByCommande(commande: Commande) {
    return this.http.post<Facture>("http://localhost:8080/factures/commande",commande).pipe();
  }
  
}
