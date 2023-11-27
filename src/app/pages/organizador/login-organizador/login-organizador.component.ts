import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizadorService } from 'src/app/services/organizador.service';

@Component({
  selector: 'app-login-organizador',
  templateUrl: './login-organizador.component.html',
  styleUrls: ['./login-organizador.component.css']
})
export class LoginOrganizadorComponent implements OnInit{
  isLoggedIn: boolean = false;
  alertaEmail: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private organizadorService: OrganizadorService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = (isLoggedIn === 'True');
  }

  login(): void{
    if (this.username && this.password) {
      this.organizadorService.login(this.username, this.password).subscribe((response) =>{
        if(response.length > 0){
          localStorage.setItem('isLoggedIn', 'True');
          localStorage.setItem('userType', 'Organizador');
          localStorage.setItem('organizadorId', response[0].id.toString());
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