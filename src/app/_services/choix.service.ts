import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Choix } from '../_models/choix';
import { Commande } from '../_models/commande';

@Injectable({
  providedIn: 'root'
})
export class ChoixService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Choix[]>('http://localhost:8080/choix').pipe();
  }

  getOne(id: number) {
    return this.http.get<Choix>('http://localhost:8080/choix/'+id).pipe();
  }

  addOne(choix: Choix) {
    return this.http.post("http://localhost:8080/choix",choix).pipe();
  }

  updateOne(id: number, choix: Choix) {
    return this.http.put('http://localhost:8080/choix/'+id,choix).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/choix/'+id).pipe();
  }

  getByCommande(commande: Commande) {
    return this.http.post<Choix[]>("http://localhost:8080/choix/commande",commande).pipe();
  }

  getByIdCommande(id: number) {
    return this.http.get<Choix[]>('http://localhost:8080/choix/commande/'+id).pipe();
  }
}
