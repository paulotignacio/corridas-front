import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmacaoDialogComponent } from 'src/app/pages/confirmacao-dialog/confirmacao-dialog.component';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css']
})
export class CidadeListComponent implements OnInit{
  cidades: Cidade[] = [];

  constructor
  ( private cidadeService: CidadeService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.listarCidades();
  }

  listarCidades(): void {
    this.cidadeService.listarCidades().subscribe((cidades) => {
      this.cidades = cidades;
    });
  }

  editarCidade(cidade: Cidade) {
    this.router.navigate(['/cidades/editar', cidade.id]);
  }

  removerCidade(id: number): void{
    this.cidadeService.removerCidade(id).subscribe(() => {
      this.listarCidades();
    });
  }

  confirmarExclusao(cidade: Cidade): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '250px',
      data: { mensagem: 'Deseja excluir o registro?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.removerCidade(cidade.id);
      }
    });
  }
}
