import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organizador } from 'src/app/models/organizador.model';
import { OrganizadorService } from 'src/app/services/organizador.service';

@Component({
  selector: 'app-organizador-form',
  templateUrl: './organizador-form.component.html',
  styleUrls: ['./organizador-form.component.css']
})
export class OrganizadorFormComponent implements OnInit {
  organizador: Organizador = { id: 0, nome: '', username: '', password: '' };

  constructor(
    private organizadorService: OrganizadorService,
    private route: ActivatedRoute,
    private router: Router
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
      localStorage.setItem('isLoggedIn','True');
      localStorage.setItem('userType','Organizador');
      localStorage.setItem('organizadorId', organizador.id.toString());
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    });
  }
}