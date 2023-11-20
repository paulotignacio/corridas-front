import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, timeout } from 'rxjs';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {
  cidade: Cidade = { id: 0, nome: '', estado: 0};
  estados: Estado[] = [];
  selectedEstado: any;

  constructor(
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEstados();

    const cidadeId = this.route.snapshot.paramMap.get('id');
    if(cidadeId){
      const numberId = +cidadeId;
      this.cidadeService.listarCidade(numberId).subscribe((cidade) => {
        this.cidade = cidade;
      });
    }    
  }

  atualizarCidade(): void {
    this.cidade.estado = this.selectedEstado;
    this.cidadeService.atualizarCidade(this.cidade).subscribe(() => {
      this.router.navigate(['/cidades']);
    });
  }

  carregarEstados(): void{
    this.estadoService.listarEstados().subscribe((estados) => {
      this.estados = estados;
    });

  }
}
