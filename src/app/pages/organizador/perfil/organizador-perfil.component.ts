import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organizador } from 'src/app/models/organizador.model';
import { OrganizadorService } from 'src/app/services/organizador.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './organizador-perfil.component.html',
  styleUrls: ['./organizador-perfil.component.css']
})
export class OrganizadorPerfilComponent implements OnInit{
  organizador: Organizador = { id: 0, nome: '', username: '', password: '' };

  constructor(
    private organizadorService: OrganizadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    const organizadorId = this.route.snapshot.paramMap.get('id');
    if(organizadorId){
      const numberId = +organizadorId;
      this.organizadorService.listarOrganizador(numberId).subscribe((organizador) => {
        this.organizador = organizador;
      });
    }  
  }
  
  atualizarOrganizador(): void {
    this.organizadorService.atualizarOrganizador(this.organizador).subscribe((organizador) => {
      this.organizador = organizador;
    });
  }
}
