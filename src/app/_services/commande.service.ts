import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../_models/commande';
import { CommandeResa } from '../_models/commanderesa';
import { MontantFacture } from '../_models/montantfacture';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Commande[]>('http://localhost:8080/commandes').pipe();
  }

  getOne(id: number) {
    return this.http.get<Commande>('http://localhost:8080/commandes/'+id).pipe();
  }

  addOne(commande: Commande) {
    return this.http.post("http://localhost:8080/commandes",commande).pipe();
  }

  updateOne(id: number, commande: Commande) {
    return this.http.put('http://localhost:8080/commandes/'+id,commande).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/commandes/'+id).pipe();
  }

  getOneByTableAndDate(commanderesa: CommandeResa) {
    return this.http.post<Commande>("http://localhost:8080/commandes/resa",commanderesa).pipe();
  }

  getMontantById(id: number) {
    return this.http.get<MontantFacture>('http://localhost:8080/commandes/montant/'+id).pipe();
  }
}
