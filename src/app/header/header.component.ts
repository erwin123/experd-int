import { Component, OnInit } from '@angular/core';
import { ClarityIcons } from '@clr/icons';
import { AuthloginService } from '../services/authlogin.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthloginService,public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
