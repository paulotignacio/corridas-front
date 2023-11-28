import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-administrador-perfil',
  templateUrl: './administrador-perfil.component.html',
  styleUrls: ['./administrador-perfil.component.css']
})
export class AdministradorPerfilComponent implements OnInit {
  administrador: Administrador = { id: 0, nome: '', username: '', password: '' };

  constructor(
    private administradorService: AdministradorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    const organizadorId = this.route.snapshot.paramMap.get('id');
    if(organizadorId){
      const numberId = +organizadorId;
      this.administradorService.listarAdministrador(numberId).subscribe((organizador) => {
        this.administrador = organizador;
      });
    }  
  }
  
  atualizarAdministrador(): void {
    this.administradorService.atualizarAdministrador(this.administrador).subscribe((organizador) => {
      this.administrador = organizador;
    });
  }

}
