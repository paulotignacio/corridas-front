import { CdkDialogContainer } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ROUTER_INITIALIZER, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { Corrida } from 'src/app/models/corrida.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  corridas: Corrida[] = [];
  corridasFiltered: Corrida[] = [];
  estados: Estado[] = [];
  selectedEstado: any;
  cidades: Cidade[] = [];
  selectedCidade: any;
  dataInicial: any;
  dataFinal: any;
  
  constructor(
    private corridaService: CorridaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
  ) {}

  ngOnInit(): void {

    this.carregarEstados();
    this.carregarCorridas();
  }
 
  carregarCorridas(): void{
    this.corridaService.listarCorridas().subscribe((corridas) => {
      this.corridas = corridas;
      this.corridasFiltered = this.corridas;
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

  onPesquisar(){
    this.corridasFiltered = this.corridas.filter(corrida =>
      (!this.selectedCidade || corrida.cidade === this.selectedCidade) &&
      (!this.dataInicial || new Date(corrida.data_largada) >= this.dataInicial) &&
      (!this.dataFinal || new Date(corrida.data_largada) <= this.dataInicial)
    );
  }
}
