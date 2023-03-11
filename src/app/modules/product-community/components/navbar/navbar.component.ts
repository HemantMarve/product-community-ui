import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()  public userLoggedIn:boolean=false;
  public isMenuCollapsed = true;
  user:string='';
  constructor(private authenticateService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.userLoggedIn=this.authenticateService.isLoggedIn();
    this.user=localStorage.user;
  }

  logout(){
    this.authenticateService.logout();
    this.router.navigateByUrl('/login');
  }

}
