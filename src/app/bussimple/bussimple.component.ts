import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountriesService } from '../services/countries.service';
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

  activeState: boolean[] = [true, false, false];

  orderForm: FormGroup;
  items: FormArray;

  stateOptions: any[];
  value1: string = "off";

  //real
  lstActividad: any[];
  lstActividadSelect: any[];
  lstTodasColecciones : any[];

    customers: any[];

    first = 0;

    rows = 10;


  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private _spinner: NgxSpinnerService,
              private _lstgeneralService : LstgeneralService,
              private _recursoService:  RecursoService,
              private _todoscoleccionesService: TodoscoleccionesService) {

              this.doCargarLstGenerales();

              this.stateOptions = [{label: 'Y', value: 'Y'}, {label: 'O', value: 'O'}];

  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([this.createItem()])
    });



  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
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



  doBuscarTodaslasColecciones(){
    this._spinner.show();
    let param={};
    if(this.vcRecurso.vcNombreCientifico){
    param={
      vcNombreCientifico : this.vcRecurso.vcNombreCientifico,
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
         console.log(JSON.stringify(resp));
         this.lstTodasColecciones=resp.lstTodasColecciones;
      },
      error=>{
        this._spinner.hide();
      }
    );
  }

addItem(): void {
  this.items = this.orderForm.get('items') as FormArray;
  this.items.push(this.createItem());
}

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
  return this.customers ? this.first === (this.customers.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.customers ? this.first === 0 : true;
}

}
