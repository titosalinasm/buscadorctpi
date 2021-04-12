import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { DataService } from '../utils/data.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent   implements OnInit {

  constructor(  private router: Router,
                private tokenService : TokenService,
                private _spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.obtenerToken();
  }

  goToBuscar(nuProceso :any){

    if (nuProceso==1){

    this.router.navigate(['/bussimple']);
    }
    if (nuProceso==2)
    {
    this.router.navigate(['/busavanzado']);
    }

  }

  obtenerToken() {
    // let _token = sessionStorage.getItem('access_token');
    this._spinner.show();
      this.tokenService.obtenerToken$().subscribe(
        resp => {
          this._spinner.hide();
          if (resp.access_token) {
            sessionStorage.setItem("access_token", resp.access_token);
          }
        },
        error => {
          this._spinner.hide();
        },
      );

  }

}
