import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { Corrida } from 'src/app/models/corrida.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.css'],
  providers: [
    DatePipe
  ]
})
export class CorridaFormComponent implements OnInit{
  corrida: Corrida = { 
    id: 0, 
    nome: '', 
    inicio_inscricao: '',
    fim_inscricao: '',
    data_largada: '',
    hora_largada: '',
    data_hora_largada: new Date(),
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
    private router: Router,
    private datePipe: DatePipe
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
    this.corrida.organizador = +this.organizadorId;
    var formattedDate = this.datePipe.transform(this.corrida.inicio_inscricao, "yyyy-MM-dd");
    if(formattedDate)
      this.corrida.inicio_inscricao = formattedDate;

    formattedDate = this.datePipe.transform(this.corrida.fim_inscricao, "yyyy-MM-dd");
    if(formattedDate)
      this.corrida.fim_inscricao = formattedDate;
    
    formattedDate = this.datePipe.transform(this.corrida.data_largada, "yyyy-MM-dd");
    if(formattedDate)
      this.corrida.data_largada = formattedDate;

    this.corridaService.atualizarCorrida(this.corrida).subscribe(() => {
      this.router.navigate(['/corridas']);
    });
  }

  carregarEstados(): void{
    this.estadoService.listarEstados().subscribe((estados) => {
      this.estados = estados.sort((a, b) => (a.nome > b.nome) ? 1:-1);;
    });
  }

  onEstadoChanged(){
    this.cidadeService.listarCidadesDoEstado(this.selectedEstado).subscribe((cidades) =>{
      this.cidades = cidades.sort((a, b) => (a.nome > b.nome) ? 1:-1);;
    });
  }

  carregarStorage(): void{
    const organizadorId = localStorage.getItem('organizadorId');
    if(organizadorId)
      this.organizadorId = organizadorId;
  }
}
