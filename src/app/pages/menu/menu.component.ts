import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  isLoggedIn: boolean = false; // Set this based on user login status
  isOrganizador: boolean = false;
  organizadorId = '';
  isAdministrador: boolean = false;
  administradorId = ''
  isAtleta: boolean = false;
  atletaId = ''

  constructor(
    private router: Router
  ) {}
  
    ngOnInit(): void {
      var isLoggedIn = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = (isLoggedIn === 'True');

      var userType = localStorage.getItem('userType');
      this.isAdministrador = (userType === 'Administrador');
      if(this.isAdministrador)
      {
        const administradorId = localStorage.getItem('administradorId');
        if(administradorId)
          this.administradorId = administradorId;
      }

      var userType = localStorage.getItem('userType');
      this.isOrganizador = (userType === 'Organizador');
      if(this.isOrganizador)
      {
        const organizadorId = localStorage.getItem('organizadorId');
        if(organizadorId)
          this.organizadorId = organizadorId;
      }

      var userType = localStorage.getItem('userType');
      this.isAtleta = (userType === 'Atleta');
      if(this.isAtleta)
      {
        const atletaId = localStorage.getItem('atletaId');
        if(atletaId)
          this.atletaId = atletaId;
      }

    }
}
