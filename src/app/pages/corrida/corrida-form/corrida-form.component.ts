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
  providers: [DatePipe]
})
export class CorridaFormComponent implements OnInit {
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
    cidade: { 
      id: 0, 
      nome: '', 
      estado: { 
        id: 0, 
        nome: '',  // Incluindo também o 'nome' do estado como esperado pela interface Estado
        uf: '' 
      } 
    },
    organizador: 0
  };
  
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  organizadorId = '';
  selectedEstado: Estado | null = null;  // Correto
  selectedCidade: Cidade | null = null;  // Correto

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
    if (corridaId) {
      const numberId = +corridaId;
      this.corridaService.listarCorrida(numberId).subscribe((corrida) => {
        this.corrida = corrida;
        this.selectedCidade = corrida.cidade; // Carrega a cidade da corrida
        this.selectedEstado = corrida.cidade.estado; // Carrega o estado da corrida
      });
    }
  }

  atualizarCorrida(): void {
    if (this.selectedCidade) {
      this.corrida.cidade = this.selectedCidade; // Define a cidade selecionada
    }
    this.corrida.organizador = +this.organizadorId;

    this.corrida.inicio_inscricao = this.formatarData(this.corrida.inicio_inscricao);
    this.corrida.fim_inscricao = this.formatarData(this.corrida.fim_inscricao);
    this.corrida.data_largada = this.formatarData(this.corrida.data_largada);

    this.corridaService.atualizarCorrida(this.corrida).subscribe(() => {
      this.router.navigate(['/corridas']);
    });
  }

  formatarData(data: string): string {
    const formattedDate = this.datePipe.transform(data, "yyyy-MM-dd");
    return formattedDate ? formattedDate : data; // Retorna a data formatada ou a original
  }

  carregarEstados(): void {
    this.estadoService.listarEstados().subscribe((estados) => {
      this.estados = estados.sort((a, b) => (a.nome > b.nome) ? 1 : -1);
    });
  }

  onEstadoChanged(): void {
    if (this.selectedEstado) {
      this.cidadeService.listarCidadesDoEstado(this.selectedEstado.id).subscribe((cidades) => {
        this.cidades = cidades.sort((a, b) => (a.nome > b.nome) ? 1 : -1);
      });
    }
  }

  carregarStorage(): void {
    const organizadorId = localStorage.getItem('organizadorId');
    if (organizadorId) {
      this.organizadorId = organizadorId;
    }
  }
}
