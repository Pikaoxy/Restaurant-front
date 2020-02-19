import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

import { HeaderComponent } from './header/header.component';
import { EmployeComponent } from './employe/employe.component';
import { TableComponent } from './table/table.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ListeTablesComponent } from './liste-tables/liste-tables.component';
import { ModifierTableComponent } from './modifier-table/modifier-table.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeComponent,
    TableComponent,
    ListeEmployesComponent,
    ListeTablesComponent,
    ModifierTableComponent,
    ModifierEmployeComponent,
    ReservationComponent,
    AccueilComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
