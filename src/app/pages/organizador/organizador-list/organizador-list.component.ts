import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Organizador } from 'src/app/models/organizador.model';
import { OrganizadorService } from 'src/app/services/organizador.service';
import { ConfirmacaoDialogComponent } from '../../confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-organizador-list',
  templateUrl: './organizador-list.component.html',
  styleUrls: ['./organizador-list.component.css']
})
export class OrganizadorListComponent implements OnInit {
  organizadores: Organizador[] = [];

  constructor
  ( private organizadorService: OrganizadorService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.listarOrganizadores();
  }

  listarOrganizadores(): void {
    this.organizadorService.listarOrganizadores().subscribe((organizadores) => {
      this.organizadores = organizadores;
    });
  }

  editarOrganizador(organizador: Organizador) {
    this.router.navigate(['/organizadores/editar', organizador.id]);
  }

  removerOrganizador(id: number): void{
    this.organizadorService.removerOrganizador(id).subscribe(() => {
      this.listarOrganizadores();
    });
  }

  confirmarExclusao(organizador: Organizador): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '250px',
      data: { mensagem: 'Deseja excluir o registro?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.removerOrganizador(organizador.id);
      }
    });
  }

}