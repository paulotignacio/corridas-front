import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Cidade } from 'src/app/models/cidade.model';
import { Corrida } from 'src/app/models/corrida.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.css']
})
export class CorridaFormComponent implements OnInit{
  corrida: Corrida = { 
    id: 0, 
    nome: '', 
    inicio_inscricao: new Date(),
    fim_inscricao: new Date(),
    data_largada: new Date(),
    hora_largada: '',
    percurso: '',
    valor: 0,
    site: '',
    cidade: 0,
    organizador: 0
  };
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  corridas: Corrida[] = [];
  selectedEstado: any;
  selectedCidade: any;
  organizadorId = '';

  constructor(
    private corridaService: CorridaService,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEstados();

    this.carregarStorage();

    const corridaId = this.route.snapshot.paramMap.get('id');
    if(corridaId){
      const numberId = +corridaId;
      this.corridaService.listarCorrida(numberId).subscribe((corrida) => {
        this.corrida = corrida;
      });
    }
  }

  atualizarCorrida(): void {
    this.corrida.cidade = this.selectedCidade;
    this.corrida.organizador =+ this.organizadorId;
    this.corridaService.atualizarCorrida(this.corrida).subscribe(() => {
      this.router.navigate(['/corridas']);
    });
  }

  carregarEstados(): void{
    this.estadoService.listarEstados().subscribe((estados) => {
      this.estados = estados;
    });
  }

  onEstadoChanged(){
    this.cidadeService.listarCidadesDoEstado(this.selectedEstado).subscribe((cidades) =>{
      this.cidades = cidades;
    });
  }

  carregarStorage(): void{
    const organizadorId = localStorage.getItem('organizadorId');
    if(organizadorId)
      this.organizadorId = organizadorId;
  }
}
