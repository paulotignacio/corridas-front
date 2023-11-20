import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent implements OnInit{
  estado: Estado = { id: 0, nome: '', uf: ''};

  constructor(
    private estadoService: EstadoService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const estadoId = this.route.snapshot.paramMap.get('id');
    if(estadoId){
      const numberId = +estadoId;
      this.estadoService.listarEstado(numberId).subscribe((estado) => {
        this.estado = estado;
      });
    }    
  }

  atualizarEstado(): void {
    this.estadoService.atualizarEstado(this.estado).subscribe(() => {
      this.router.navigate(['/estados']);
    });
  }
}
