import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from '../../confirmacao-dialog/confirmacao-dialog.component';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css']
})
export class AdministradorListComponent implements OnInit {
  administradorId = '';
  administradores: Administrador[] = [];

  constructor
  ( private administradorService: AdministradorService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.carregarStorage();
    if(!this.administradorId)
    {
      this.router.navigate(['']);
    }

    this.listarAdministradores();
  }

  listarAdministradores(): void {
    this.administradorService.listarAdministradores().subscribe((administradores) => {
      this.administradores = administradores;
    });
  }

  editarAdministrador(administrador: Administrador) {
    this.router.navigate(['/administradores/editar', administrador.id]);
  }

  removerAdministrador(id: number): void{
    this.administradorService.removerAdministrador(id).subscribe(() => {
      this.listarAdministradores();
    });
  }

  confirmarExclusao(administrador: Administrador): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '250px',
      data: { mensagem: 'Deseja excluir o registro?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.removerAdministrador(administrador.id);
      }
    });
  }

  carregarStorage(): void{
    const administradorId = localStorage.getItem('administradorId');
    if(administradorId)
      this.administradorId = administradorId;
  }

}