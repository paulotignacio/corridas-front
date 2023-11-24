import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn: boolean = false; // Set this based on user login status

constructor(
  private router: Router
) {}

  ngOnInit(): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = (isLoggedIn === 'True');
  }

  // Implement logout logic
  logout(): void {
    localStorage.setItem('isLoggedIn', 'False');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('administradorId');
    localStorage.removeItem('organizadorId');
    localStorage.removeItem('atletaId');
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
