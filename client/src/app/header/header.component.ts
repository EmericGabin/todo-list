import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: Router;
  authSvc: AuthService;
  constructor(){
    this.router = inject(Router);
    this.authSvc = inject(AuthService);
  }

  ngOnInit(): void {
  }
  
  logOut(): void {
    sessionStorage.clear();
    this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
