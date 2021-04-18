import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { BannerPrincipalComponent } from './banner-principal/banner-principal.component';
import { MenuComponent } from './menu/menu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { BussimpleComponent } from './bussimple/bussimple.component';
import { BusavanzadoComponent } from './busavanzado/busavanzado.component';

import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';

import { NgxSpinnerModule } from "ngx-spinner";
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OauthInterceptorService } from './services/oauth-interceptor.service';
import { LstgeneralService } from './services/lstgeneral.service';
import { TokenService } from './services/token.service';
import { RecursoService } from './services/recurso.service';
import { TodoscoleccionesService } from './services/todoscolecciones.service';
import { DetalleService } from './services/detalle.service';
import { BusquedaavanzadaService } from './services/busquedaavanzada.service';
import { BusquedaconocimientoService } from './services/busquedaconocimiento.service';
import { BusquedapatentesService } from './services/busquedapatentes.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    BannerPrincipalComponent,
    MenuComponent,
    BussimpleComponent,
    BusavanzadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    MultiSelectModule,
    AutoCompleteModule,
    InputTextModule,
    SelectButtonModule,
    NgxSpinnerModule,
    TableModule,
    ButtonModule,
    AccordionModule,
  ],
  providers: [
    TokenService,
    LstgeneralService,
    RecursoService,
    TodoscoleccionesService,
    DetalleService,
    BusquedaavanzadaService,
    BusquedaconocimientoService,
    BusquedapatentesService,
    { provide: HTTP_INTERCEPTORS, useClass: OauthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
