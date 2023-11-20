import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';
import { Administrador } from 'src/app/models/administrador.model';

@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.css']
})
export class AdministradorFormComponent implements OnInit {
  administrador: Administrador = { id: 0, nome: '', username: '', password: '' };

  constructor(
    private administradorService: AdministradorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
        
    const administradorId = this.route.snapshot.paramMap.get('id');
    if(administradorId){
      const numberId = +administradorId;
      this.administradorService.listarAdministrador(numberId).subscribe((administrador) => {
        this.administrador = administrador;
      });
    }    
  }

  atualizarAdministrador(): void {
    this.administradorService.atualizarAdministrador(this.administrador).subscribe(() => {
      this.router.navigate(['/administradores']);
    });
  }
}