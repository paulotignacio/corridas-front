import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atleta } from 'src/app/models/atleta.model';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { AtletaService } from 'src/app/services/atleta.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-atleta-form',
  templateUrl: './atleta-form.component.html',
  styleUrls: ['./atleta-form.component.css']
})
export class AtletaFormComponent implements OnInit {
  atleta: Atleta = { id: 0, nome: '', data_nascimento: new Date(), genero: '', cidade: 0, username: '', password: '' };
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  selectedEstado: any;
  selectedCidade: any;
  selectedGenero: any;

  constructor(
    private atletaService: AtletaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEstados();

    const administradorId = this.route.snapshot.paramMap.get('id');
    if(administradorId){
      const numberId = +administradorId;
      this.atletaService.listarAtleta(numberId).subscribe((atleta) => {
        this.atleta = atleta;
      });
    }    
  }

  atualizarAtleta(): void {
    this.atleta.genero = this.selectedGenero;
    this.atleta.cidade = this.selectedCidade;
    this.atletaService.atualizarAtleta(this.atleta).subscribe((atleta) => {
      localStorage.setItem('isLoggedIn','True');
      localStorage.setItem('userType','Atleta');
      localStorage.setItem('atletaId', atleta.id.toString());
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
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

}