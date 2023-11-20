import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtletaService } from 'src/app/services/atleta.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
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
      });
    }
  }
}
