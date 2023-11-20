import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmacaoDialogComponent } from './pages/confirmacao-dialog/confirmacao-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdministradorListComponent } from './pages/administrador/administrador-list/administrador-list.component';
import { AdministradorFormComponent } from './pages/administrador/administrador-form/administrador-form.component';
import { AdministradorService } from './services/administrador.service';
import { EstadoListComponent } from './pages/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './pages/estado/estado-form/estado-form.component';
import { EstadoService } from './services/estado.service';
import { CidadeService } from './services/cidade.service';
import { OrganizadorService } from './services/organizador.service';
import { AtletaService } from './services/atleta.service';
import { ContatoOrganizadorService } from './services/contato-organizador.service';
import { ContatoAtletaService } from './services/contato-atleta.service';
import { CorridaService } from './services/corrida.service';
import { CidadeListComponent } from './pages/cidade/cidade-list/cidade-list.component';
import { CidadeFormComponent } from './pages/cidade/cidade-form/cidade-form.component';
import { CorridaListComponent } from './pages/corrida/corrida-list/corrida-list.component';
import { CorridaFormComponent } from './pages/corrida/corrida-form/corrida-form.component';
import { OrganizadorListComponent } from './pages/organizador/organizador-list/organizador-list.component';
import { OrganizadorFormComponent } from './pages/organizador/organizador-form/organizador-form.component';
import { AtletaListComponent } from './pages/atleta/atleta-list/atleta-list.component';
import { AtletaFormComponent } from './pages/atleta/atleta-form/atleta-form.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginAtletaComponent } from './pages/atleta/login-atleta/login-atleta.component';
import { LoginOrganizadorComponent } from './pages/organizador/login-organizador/login-organizador.component';
import { LoginAdministradorComponent } from './pages/administrador/login-administrador/login-administrador.component';
import { OrganizadorPerfilComponent } from './pages/organizador/perfil/organizador-perfil.component';
import { AdministradorPerfilComponent } from './pages/administrador/perfil/administrador-perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmacaoDialogComponent,
    AdministradorListComponent,
    AdministradorFormComponent,
    EstadoListComponent,
    EstadoFormComponent,
    CidadeListComponent,
    CidadeFormComponent,
    CorridaListComponent,
    CorridaFormComponent,
    OrganizadorListComponent,
    OrganizadorFormComponent,
    AtletaListComponent,
    AtletaFormComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    MenuComponent,
    LoginAtletaComponent,
    LoginOrganizadorComponent,
    LoginAdministradorComponent,
    OrganizadorPerfilComponent,
    AdministradorPerfilComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    EstadoService,
    CidadeService,
    AdministradorService,
    OrganizadorService,
    AtletaService,
    ContatoOrganizadorService,
    ContatoAtletaService,
    CorridaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
