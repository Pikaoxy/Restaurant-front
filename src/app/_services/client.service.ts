import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../_models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Client[]>('http://localhost:8080/clients').pipe();
  }

  getOne(id: number) {
    return this.http.get<Client>('http://localhost:8080/clients/'+id).pipe();
  }

  addOne(client: Client) {
    return this.http.post("http://localhost:8080/clients",client).pipe();
  }

  updateOne(id: number, client: Client) {
    return this.http.put('http://localhost:8080/clients/'+id,client).pipe();
  }

  deleteOne(id: number) {
    return this.http.delete('http://localhost:8080/clients/'+id).pipe();
  }

  getByTel(tel: String) {
    return this.http.post<Client>("http://localhost:8080/clients/tel",tel).pipe();
  }
}
