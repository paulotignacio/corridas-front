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
  email: string = '';
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
    if (this.email && this.password) {
      this.atletaService.login(this.email, this.password).subscribe((response) =>{
        localStorage.setItem('isLoggedIn', 'True');
        localStorage.setItem('userType', 'Atleta');
        this.router.navigate(['']).then(() =>{
          window.location.reload();
        });
      });
    }
  }
}