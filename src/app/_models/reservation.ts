import { Client } from './client';
import { Table } from './table';

export class Reservation {
    idReservation: number;
    dateDebut: Date;
    dateFin: Date;
    nbClients: number;
    client: Client;
    table: Table;
}