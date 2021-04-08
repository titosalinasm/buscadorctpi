import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BussimpleComponent } from './bussimple/bussimple.component';
import { BusavanzadoComponent } from './busavanzado/busavanzado.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component:  InicioComponent},
  { path: 'bussimple', component:  BussimpleComponent},
  { path: 'busavanzado', component:  BusavanzadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
