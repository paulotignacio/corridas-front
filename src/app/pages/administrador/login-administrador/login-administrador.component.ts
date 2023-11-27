import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css'],
})
export class LoginAdministradorComponent implements OnInit{
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = (isLoggedIn === 'True');
  }

  login(): void{
    if (this.username && this.password) {
      this.administradorService.login(this.username, this.password).subscribe((response) =>{
        if(response.length > 0) {
          localStorage.setItem('isLoggedIn', 'True');
          localStorage.setItem('userType', 'Administrador');
          localStorage.setItem('administradorId', response[0].id.toString())
          this.router.navigate(['']).then(() =>{
            window.location.reload();
          });
        }
        else {
          alert('Usuário não encontrado');
        }
      });
    }
  }
}