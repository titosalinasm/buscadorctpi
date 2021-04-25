import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountriesService } from '../services/countries.service';
import { DetalleService } from '../services/detalle.service';
import { LstgeneralService } from '../services/lstgeneral.service';
import { RecursoService } from '../services/recurso.service';
import { TodoscoleccionesService } from '../services/todoscolecciones.service';

@Component({
  selector: 'app-bussimple',
  templateUrl: './bussimple.component.html',
  styleUrls: ['./bussimple.component.css', './bussimple.component.scss']
})
export class BussimpleComponent implements OnInit {

  modalRef: BsModalRef;

  lstRecursos: any[];
  vcRecurso: any;

  activeStatePatente: boolean[] = [true, false, false];
  blFlagShowPatente : boolean =false;
  activeStateConocimiento: boolean[] = [true, false, false, false, false];
  blFlagShowConocimiento : boolean=false;


  // orderForm: FormGroup;
  // items: FormArray;

  stateOptions: any[];
  value1: string = "off";

  //real
  lstActividad: any[];
  lstActividadSelect: any[];
  lstTodasColecciones : any[];


   objPatentes: any;
   objConocimiento: any;


    first = 0;

    rows = 10;

    isShowTable: boolean = false;
    isShowAll: boolean = false;
    idShow: any = -1;




  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private _spinner: NgxSpinnerService,
              private _lstgeneralService : LstgeneralService,
              private _recursoService:  RecursoService,
              private _todoscoleccionesService: TodoscoleccionesService,
              private _detalleService : DetalleService) {

              this.doCargarLstGenerales();

              this.stateOptions = [{label: 'Y', value: 'Y'}, {label: 'O', value: 'O'}];
  }

  ngOnInit(): void {
  }

  showOne(id: any) {
    if (this.idShow == id) {
      this.idShow = -1;
    } else {
      this.idShow = id;
    }
  }

  showAll() {
    this.isShowAll = !this.isShowAll;
  }

  imprimir() {
    window.print();
  }

  doMostrarPatenteFlag() {
    this.blFlagShowPatente=!this.blFlagShowPatente;
    for(let i=0; i<this.activeStatePatente.length; i++){
      this.activeStatePatente[i] = this.blFlagShowPatente;
    }
    }

    doMostrarConocimientoFlag() {
      this.blFlagShowConocimiento=!this.blFlagShowConocimiento;
      for(let i=0; i<this.activeStateConocimiento.length; i++){
        this.activeStateConocimiento[i] = this.blFlagShowConocimiento;
      }
      }
    printToSeccion(printSectionId: string){
      window.print();
    }


  doCargarLstGenerales(){
    this._spinner.show();
      let objJSON={};
      this._lstgeneralService.getWithPost$(objJSON).subscribe(
        resp=>{
          this._spinner.hide();
           // console.log(JSON.stringify(resp));
              this.lstActividad=resp.lstActividad;
        },
        error=>{
          this._spinner.hide();
        }
      );
  }



  doSugerencia(event : any){
    // console.log(JSON.stringify(event.query));
    let objJSON={
      vcNombreCientifico: event.query
    };
    // this.vcNombreCientificoSelect.vcNombreCientifico=event.query;
    this._recursoService.getWithPost$(objJSON).subscribe(
      resp=>{
        //  console.log(JSON.stringify(resp));
        this.lstRecursos=resp.lsRecurso;
      },
      error=>{
      }
    );
  }

  doVerDetalle(nuTipo: any, nuRegistro: any, modal_patentes: TemplateRef<any>, modal_conocimiento: TemplateRef<any>){
   console.log("doVerDetalle");
    this._spinner.show();
    let param={
      nuIdTipo: nuTipo,
      nuIdRegistro: nuRegistro
    }
    this._detalleService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        switch(nuTipo){
          case 1:
            this.objPatentes=resp;
            this.openModal(modal_patentes);
            break;
          case 2:
            this.objConocimiento=resp;
            this.openModal(modal_conocimiento);
            break;
          default:
            console.log("No se encontro tipo");
            break;
        }
        console.log(JSON.stringify(resp));
      },
      error=>{
        this._spinner.hide();
        console.log(JSON.stringify(error));
      }
    );

  }

  doBuscarTodaslasColecciones(){
    this._spinner.show();
    let param={};
    if(this.vcRecurso?.vcNombreCientifico){
    param={
      vcNombreCientifico : this.vcRecurso?.vcNombreCientifico,
      lstActividad : this.lstActividadSelect
    };
  }else{
    param={
      vcNombreCientifico : this.vcRecurso,
      lstActividad : this.lstActividadSelect
    };
  }

    // console.log()
    console.log(JSON.stringify(param));
    this._todoscoleccionesService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.isShowTable = true;
         console.log(JSON.stringify(resp));
         this.lstTodasColecciones=resp.lstTodasColecciones;
      },
      error=>{
        this._spinner.hide();
      }
    );
  }

// addItem(): void {
//   this.items = this.orderForm.get('items') as FormArray;
//   this.items.push(this.createItem());
// }

createItem(): FormGroup {
  return this.formBuilder.group({
    name: '',
    description: '',
    price: ''
  });
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}
isLastPage(): boolean {
  return this.lstTodasColecciones ? this.first === (this.lstTodasColecciones.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.lstTodasColecciones ? this.first === 0 : true;
}

}
