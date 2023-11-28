import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorridaListComponent } from './pages/corrida/corrida-list/corrida-list.component';
import { CorridaFormComponent } from './pages/corrida/corrida-form/corrida-form.component';
import { OrganizadorListComponent } from './pages/organizador/organizador-list/organizador-list.component';
import { OrganizadorFormComponent } from './pages/organizador/organizador-form/organizador-form.component';
import { AtletaListComponent } from './pages/atleta/atleta-list/atleta-list.component';
import { AtletaFormComponent } from './pages/atleta/atleta-form/atleta-form.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginAtletaComponent } from './pages/atleta/login-atleta/login-atleta.component';
import { LoginOrganizadorComponent } from './pages/organizador/login-organizador/login-organizador.component';
import { LoginAdministradorComponent } from './pages/administrador/login-administrador/login-administrador.component';
import { AdministradorFormComponent } from './pages/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './pages/administrador/administrador-list/administrador-list.component';
import { OrganizadorPerfilComponent } from './pages/organizador/perfil/organizador-perfil.component';
import { AdministradorPerfilComponent } from './pages/administrador/perfil/administrador-perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'corridas', component: CorridaListComponent },
  { path: 'corridas/nova', component: CorridaFormComponent },
  { path: 'corridas/editar/:id', component: CorridaFormComponent },
  { path: 'organizadores', component: OrganizadorListComponent },
  { path: 'organizadores/novo', component: OrganizadorFormComponent },
  { path: 'organizadores/editar/:id', component: OrganizadorFormComponent },
  { path: 'organizadores/login', component: LoginOrganizadorComponent },
  { path: 'organizador-perfil/:id', component: OrganizadorPerfilComponent },
  { path: 'atletas', component: AtletaListComponent },
  { path: 'atletas/novo', component: AtletaFormComponent },
  { path: 'atletas/editar/:id', component: AtletaFormComponent },
  { path: 'atletas/login', component: LoginAtletaComponent },
  { path: 'admin/novo', component: AdministradorFormComponent },
  { path: 'administradores', component: AdministradorListComponent },
  { path: 'administrador-perfil/:id', component: AdministradorPerfilComponent },
  { path: 'administradores/novo', component: AdministradorFormComponent },
  { path: 'administradores/editar/:id', component: AdministradorFormComponent },
  { path: 'admin', component: LoginAdministradorComponent },
  { path: '**', redirectTo: '' },//manter na última posição para checar as outras primeiro
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
