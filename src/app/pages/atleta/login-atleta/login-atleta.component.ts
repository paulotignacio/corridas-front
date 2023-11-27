import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtletaService } from 'src/app/services/atleta.service';

@Component({
  selector: 'app-login-atleta',
  templateUrl: './login-atleta.component.html',
  styleUrls: ['./login-atleta.component.css']
})
export class LoginAtletaComponent implements OnInit{
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    private atletaService: AtletaService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = (isLoggedIn === 'True');
  }

  login(): void{
    if (this.username && this.password) {
      this.atletaService.login(this.username, this.password).subscribe((response) =>{
        if(response.length > 0)
        {
          localStorage.setItem('isLoggedIn', 'True');
          localStorage.setItem('userType', 'Atleta');
          this.router.navigate(['']).then(() =>{
            window.location.reload();
          });
        }
        else
        {
          alert('Usuário não encontrado');
        }
      });
    }
  }
}