import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cidade } from 'src/app/models/cidade.model';
import { Corrida } from 'src/app/models/corrida.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DetalheCorridaComponent } from '../detalhe-corrida/detalhe-corrida.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  corridas: Corrida[] = [];
  corridasFiltered: Corrida[] = [];
  estados: Estado[] = [];
  selectedEstado: any;
  cidades: Cidade[] = [];
  selectedCidade: any;
  dataInicial = '';
  dataFinal = '';
  
  constructor(
    private corridaService: CorridaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarCorridas();
  }
 
  carregarCorridas(): void{
    this.corridaService.listarCorridas().subscribe((corridas) => {
      // corridas.map(x => x.data_hora_largada = new Date(x.data_largada.getFullYear(), x.data_largada.getMonth(), x.data_largada.getDate(),  + x.hora_largada.ho))
      corridas.map(x => x.data_hora_largada = new Date(x.data_largada + "T" + x.hora_largada))
      this.corridas = corridas;
      this.corridasFiltered = this.corridas;
    });
  }
  
  carregarEstados(): void{
    this.estadoService.listarEstados().subscribe((estados) => {
      this.estados = estados.sort((a, b) => (a.nome > b.nome) ? 1:-1);
    });
  }

  onEstadoChanged(){
    this.cidadeService.listarCidadesDoEstado(this.selectedEstado).subscribe((cidades) =>{
      this.cidades = cidades.sort((a, b) => (a.nome > b.nome) ? 1:-1);
    });
  }

  onPesquisar(){
    console.log(this.selectedCidade);
    console.log(new Date(this.dataInicial));
    console.log(new Date(this.dataFinal));
    this.corridasFiltered = this.corridas.filter(corrida =>
    (!this.selectedCidade || corrida.cidade == this.selectedCidade) 
    && (!this.dataInicial || new Date(this.dataInicial) <= new Date(corrida.data_largada))
    && (!this.dataFinal || new Date(this.dataFinal) >= new Date(corrida.data_largada))
    );
    
    console.log(this.corridasFiltered);
  }

  onLimpar():void{
    this.selectedCidade = null;
    this.cidades = [];
    this.selectedEstado = null;
    this.dataInicial = '';
    this.dataFinal = '';
    this.corridasFiltered = this.corridas;
  }

  abrirDetalheCorrida(corrida: Corrida) {
    const dialogRef = this.dialog.open(DetalheCorridaComponent, {
       data: { corrida: corrida},
     });
  }
}
