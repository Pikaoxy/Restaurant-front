import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plat } from '../_models/plat';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Plat[]>('http://localhost:8080/plats').pipe();
  }

  getOne(id: number) {
    return this.http.get<Plat>('http://localhost:8080/plats/'+id).pipe();
  }

  addOne(plat: Plat) {
    return this.http.post("http://localhost:8080/plats",plat).pipe();
  }

  updateOne(id: Number, plat: Plat) {
    return this.http.put('http://localhost:8080/plats/'+id,plat).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/plats/'+id).pipe();
  }

  getByCategorie(categorie: String) {
    return this.http.post<Plat[]>("http://localhost:8080/plats/categorie",categorie).pipe();
  }
}
