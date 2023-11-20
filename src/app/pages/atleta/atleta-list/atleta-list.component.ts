import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Atleta } from 'src/app/models/atleta.model';
import { AtletaService } from 'src/app/services/atleta.service';
import { ConfirmacaoDialogComponent } from '../../confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-atleta-list',
  templateUrl: './atleta-list.component.html',
  styleUrls: ['./atleta-list.component.css']
})
export class AtletaListComponent implements OnInit {
  atletas: Atleta[] = [];

  constructor
  ( private atletaService: AtletaService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.listarAtletas();
  }

  listarAtletas(): void {
    this.atletaService.listarAtletas().subscribe((atletas) => {
      this.atletas = atletas;
    });
  }

  editarAtleta(atleta: Atleta) {
    this.router.navigate(['/atletas/editar', atleta.id]);
  }

  removerAtleta(id: number): void{
    this.atletaService.removerAtleta(id).subscribe(() => {
      this.listarAtletas();
    });
  }

  confirmarExclusao(administrador: Atleta): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '250px',
      data: { mensagem: 'Deseja excluir o registro?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.removerAtleta(administrador.id);
      }
    });
  }

}
