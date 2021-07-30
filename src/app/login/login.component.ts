import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  entrarComGoogle() {
    this._authService.entrarComGoogle()
    .then(() => this.router.navigateByUrl('home'));
  }

}
