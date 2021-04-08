import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(  private router: Router,) { }

  ngOnInit(): void {
  }

  goToBuscar(nuProceso :any){

    if (nuProceso==1){
      
    this.router.navigate(['/bussimple']);
    }
    if (nuProceso==2)
    {
    this.router.navigate(['/busavanzado']);
    }

    // this.router.navigate(['/documentos', vcProceso]);

  }
}
