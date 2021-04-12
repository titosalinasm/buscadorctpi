import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CountriesService } from '../services/countries.service';
import { LstgeneralService } from '../services/lstgeneral.service';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-bussimple',
  templateUrl: './bussimple.component.html',
  styleUrls: ['./bussimple.component.css']
})
export class BussimpleComponent implements OnInit {

  modalRef: BsModalRef;


  results: any[];

  orderForm: FormGroup;
  items: FormArray;

  stateOptions: any[];
  value1: string = "off";

  //real
  lstActividad: any[];
  lstActividadSelect: any[];
  vcNombreCientificoSelect: any;


  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private _lstgeneralService : LstgeneralService,
              private _recursoService:  RecursoService) {

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

  doCargarLstGenerales(){
      let objJSON={};
      this._lstgeneralService.getWithPost$(objJSON).subscribe(
        resp=>{
           // console.log(JSON.stringify(resp));
              this.lstActividad=resp.lstActividad;
        },
        error=>{

        }
      );
  }

  doSeleccionar(){
   console.log(JSON.stringify(this.lstActividadSelect));
  }

  doSugerencia(event : any){
    // console.log(JSON.stringify(event.query));
    let objJSON={
      vcNombreCientifico: event.query
    };
    this._recursoService.getWithPost$(objJSON).subscribe(
      resp=>{
         console.log(JSON.stringify(resp));
         this.results=resp.lsRecurso;
            // this.lstActividad=resp.lstActividad;
      },
      error=>{

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

}
