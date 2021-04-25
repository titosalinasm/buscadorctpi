import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrowserStack } from 'protractor/built/driverProviders';
import { BusquedaavanzadaService } from '../services/busquedaavanzada.service';
import { BusquedaconocimientoService } from '../services/busquedaconocimiento.service';
import { BusquedapatentesService } from '../services/busquedapatentes.service';
import { DetalleService } from '../services/detalle.service';
import { LstgeneralService } from '../services/lstgeneral.service';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-busavanzado',
  templateUrl: './busavanzado.component.html',
  styleUrls: ['./busavanzado.component.css', './busavanzado.component.scss']
})
export class BusavanzadoComponent implements OnInit {

  modalRef: BsModalRef;


  //REAL
  blRadioButton1 : string='AND';//
  blInputShow1 : boolean=true;

  blRadioButton2 : string='AND';
  blInputShow2 : boolean=false;

  blRadioButton3 : string='AND';
  blInputShow3 : boolean=false;

  blRadioButton4 : string='AND';
  blInputShow4 : boolean=false;

  blRadioButton5 : string='AND';
  blInputShow5 : boolean=false;

  blRadioButton6 : string='AND';
  blInputShow6 : boolean=false;

  blRadioButton7 : string='AND';
  blInputShow7 : boolean=false;

  blRadioButton8 : string='AND';
  blInputShow8 : boolean=false;

  blRadioButton9 : string='AND';
  blInputShow9 : boolean=false;

  blRadioButton10 : string='AND';
  blInputShow10 : boolean=false;

  lstActividadPatentes : any[];
  lstActividadPatentesSelect :any[];
  lstActividadConocimiento : any[];
  lstActividadConocimientoSelect: any[];
  lstActividadAvanzado : any[];
  lstActividadAvanzadoSelect: any[];

  lstTipoBibliografia : any[];
  lstPueblo : any[];
  lstTipoConocimiento : any[];

  lstRecursoPatente :any[];
  vcRecursoPatenteSelect : any;
  lstRecursoConocimiento : any[];
  vcRecursoConocimientoSelect : any;
  lstRecursoAvanzado : any[];
  vcRecursoAvanzadoSelect : any;

  //resultados
  lstResultadoPatente : any[];
  firstPatente = 0;
  rowsPatente = 10;

  lstResultadoConocimiento: any[];
  firstConocimiento = 0;
  rowsConocimiento = 10;

  lstResultadoAvanzado : any[];
  firstAvanzado = 0;
  rowsAvanzado = 10;



  frmAgregarDatosLogicos = this.formBuilder.group({
    // nuFlagPrioridadExtr: ['', [Validators.required]],
    valor1: ['', [Validators.required]],
    valor2: ['', [Validators.required]],
    valor3: ['', [Validators.required]],
    valor4: ['', [Validators.required]],
    valor5: ['', [Validators.required]],
    valor6: ['', [Validators.required]],
    valor7: ['', [Validators.required]],
    valor8: ['', [Validators.required]],
    valor9: ['', [Validators.required]],
    valor10: ['', [Validators.required]],
  });

  frmPatentes = this.formBuilder.group({
    vcResumen: ['', [Validators.required]],
    vcTituloPatente: ['', [Validators.required]],
    vcNumeroPublicacion: ['', [Validators.required]],
    vcCip: ['', [Validators.required]],
    vcReinvindicacion: ['', [Validators.required]],
  });

  frmConocimientos1 = this.formBuilder.group({
    nuIdTipoConocimiento: ['', [Validators.required]],
  });

  frmConocimientos2 = this.formBuilder.group({
    vcNombreComun: ['', [Validators.required]],
    nuIdTipoBibliografia: ['', [Validators.required]],
    nuIdPueblo: ['', [Validators.required]],
    vcDescripcion: ['', [Validators.required]],
  });

  //Detalle
  activeStatePatente: boolean[] = [true, false, false];
  blFlagShowPatente : boolean =false;
  activeStateConocimiento: boolean[] = [true, false, false, false, false];
  blFlagShowConocimiento : boolean=false;

  objPatentes: any;
  objConocimiento: any;


  isShowTablePatentes: boolean = false;
  isShowAllPatentes: boolean = false;
  idShowPatentes: any = -1;

  isShowTableConocimiento: boolean = false;
  isShowAllConocimiento: boolean = false;
  idShowConocimiento: any = -1;

  isShowTableAvanzado: boolean = false;
  isShowAllAvanzado: boolean = false;
  idShowAvanzado: any = -1;


  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private _spinner: NgxSpinnerService,
              private _lstgeneralService : LstgeneralService,
              private _busquedapatentesService : BusquedapatentesService,
              private _busquedaconocimientoService: BusquedaconocimientoService,
              private _busquedaavanzadaService: BusquedaavanzadaService,
              private _recursoService:  RecursoService,
              private _detalleService : DetalleService,
              ) {

                this.doCargarLstGenerales();
  }

  ngOnInit(): void {
    this.frmConocimientos1.get('nuIdTipoConocimiento').setValue(1);
  }
doShowTab(item : any){
 switch(item){
    case 1:
      this.isShowTablePatentes=true;
      this.isShowTableConocimiento=false;
      this.isShowTableAvanzado=false;
    break;
    case 2:
      this.isShowTablePatentes=false;
      this.isShowTableConocimiento=true;
      this.isShowTableAvanzado=false;
    break;
    case 3:
      this.isShowTablePatentes=false;
      this.isShowTableConocimiento=false;
      this.isShowTableAvanzado=true;
    break;

 }
}

  showOnePatente(id: any) {
    if (this.idShowPatentes == id) {
      this.idShowPatentes = -1;
    } else {
      this.idShowPatentes = id;
    }
  }

  showAllPatente() {
    this.isShowAllPatentes = !this.isShowAllPatentes;
  }

  showOneConocimiento(id: any) {
    if (this.idShowConocimiento == id) {
      this.idShowConocimiento = -1;
    } else {
      this.idShowConocimiento = id;
    }
  }

  showAllConocimiento() {
    this.isShowAllConocimiento = !this.isShowAllConocimiento;
  }

  showOneAvanzado(id: any) {
    if (this.idShowAvanzado== id) {
      this.idShowAvanzado = -1;
    } else {
      this.idShowAvanzado = id;
    }
  }

  showAllAvanzado() {
    this.isShowAllAvanzado = !this.isShowAllAvanzado;
  }

  imprimir() {
    window.print();
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
  doBuscarPatente(){
    this._spinner.show();
    let param={};
    if(this.vcRecursoPatenteSelect?.vcNombreCientifico){
    param={
      vcNombreCientifico : this.vcRecursoPatenteSelect?.vcNombreCientifico,
      lstActividad : this.lstActividadPatentesSelect,
      vcResumen: this.frmPatentes.value.vcResumen,
      vcTituloPatente:this.frmPatentes.value.vcTituloPatente,
      vcNumeroPublicacion:this.frmPatentes.value.vcNumeroPublicacion,
      vcReinvindicacion:this.frmPatentes.value.vcReinvindicacion,
      vcCip: this.frmPatentes.value.vcCip
    };
  }else{
    param={
      vcNombreCientifico : this.vcRecursoPatenteSelect,
      lstActividad : this.lstActividadPatentesSelect,
      vcResumen: this.frmPatentes.value.vcResumen,
      vcTituloPatente:this.frmPatentes.value.vcTituloPatente,
      vcNumeroPublicacion:this.frmPatentes.value.vcNumeroPublicacion,
      vcReinvindicacion:this.frmPatentes.value.vcReinvindicacion,
      vcCip: this.frmPatentes.value.vcCip
    };
  }

    // console.log()
    console.log(JSON.stringify(param));
    this._busquedapatentesService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.isShowTablePatentes=true;
        this.isShowTableConocimiento=false;
        this.isShowTableAvanzado=false;
         console.log(JSON.stringify(resp));
         this.lstResultadoPatente=resp.lstTodasColecciones;
      },
      error=>{
        this.isShowTablePatentes=false;
        this.isShowTableConocimiento=false;
        this.isShowTableAvanzado=false;
        this._spinner.hide();
      }
    );
  }

  doBuscarConocimiento(){
    this._spinner.show();
    let param={};
    if(this.vcRecursoConocimientoSelect?.vcNombreCientifico){
    param={
      vcNombreCientifico : this.vcRecursoConocimientoSelect?.vcNombreCientifico,
      lstActividad : this.lstActividadConocimientoSelect,
      nuIdTipoConocimiento: this.frmConocimientos1.value.nuIdTipoConocimiento,
      vcDescripcion: this.frmConocimientos2.value.vcDescripcion,
      vcNombreComun:this.frmConocimientos2.value.vcNombreComun,
      nuIdTipoBibliografia:this.frmConocimientos2.value.nuIdTipoBibliografia,
      nuIdPueblo: this.frmConocimientos2.value.nuIdPueblo
    };
  }else{
    param={
      vcNombreCientifico : this.vcRecursoConocimientoSelect,
      lstActividad : this.lstActividadConocimientoSelect,
      nuIdTipoConocimiento: this.frmConocimientos1.value.nuIdTipoConocimiento,
      vcDescripcion: this.frmConocimientos2.value.vcDescripcion,
      vcNombreComun:this.frmConocimientos2.value.vcNombreComun,
      nuIdTipoBibliografia:this.frmConocimientos2.value.nuIdTipoBibliografia,
      nuIdPueblo: this.frmConocimientos2.value.nuIdPueblo
    };
  }

    // console.log()
    console.log(JSON.stringify(param));
    this._busquedaconocimientoService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.isShowTablePatentes=false;
        this.isShowTableConocimiento=true;
        this.isShowTableAvanzado=false;
         console.log(JSON.stringify(resp));
         this.lstResultadoConocimiento=resp.lstTodasColecciones;
      },
      error=>{
        this.isShowTablePatentes=false;
        this.isShowTableConocimiento=false;
        this.isShowTableAvanzado=false;
        this._spinner.hide();
      }
    );
  }

  doBuscarAvanzada(){
    this._spinner.show();

    let param={};
    if(this.vcRecursoAvanzadoSelect?.vcNombreCientifico){
    param={
      vcNombreCientifico : this.vcRecursoAvanzadoSelect?.vcNombreCientifico,
      lstActividad : this.lstActividadAvanzadoSelect,
      lstValor: [
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor1
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor2
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor3
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor4
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor5
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor6
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor7
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor8
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor9
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor10
        },
      ],
      lstOperador :[
        {
          vcOperador:this.blRadioButton1
        },
        {
          vcOperador:this.blRadioButton2
        },
        {
          vcOperador:this.blRadioButton3
        },
        {
          vcOperador:this.blRadioButton4
        },
        {
          vcOperador:this.blRadioButton5
        },
        {
          vcOperador:this.blRadioButton6
        },
        {
          vcOperador:this.blRadioButton7
        },
        {
          vcOperador:this.blRadioButton8
        },
        {
          vcOperador:this.blRadioButton9
        },
        {
          vcOperador:this.blRadioButton10
        },
      ]


    };
  }else{
    param={
      vcNombreCientifico : this.vcRecursoAvanzadoSelect,
      lstActividad : this.lstActividadAvanzadoSelect,
      lstValor: [
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor1
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor2
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor3
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor4
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor5
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor6
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor7
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor8
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor9
        },
        {
          vcValor: this.frmAgregarDatosLogicos.value.valor10
        },
      ],
      lstOperador :[
        {
          vcOperador:this.blRadioButton1
        },
        {
          vcOperador:this.blRadioButton2
        },
        {
          vcOperador:this.blRadioButton3
        },
        {
          vcOperador:this.blRadioButton4
        },
        {
          vcOperador:this.blRadioButton5
        },
        {
          vcOperador:this.blRadioButton6
        },
        {
          vcOperador:this.blRadioButton7
        },
        {
          vcOperador:this.blRadioButton8
        },
        {
          vcOperador:this.blRadioButton9
        },
        {
          vcOperador:this.blRadioButton10
        },
      ]
    };
  }

    // console.log()
    console.log(JSON.stringify(param));
    this._busquedaavanzadaService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.isShowTablePatentes=false;
        this.isShowTableConocimiento=false;
        this.isShowTableAvanzado=true;
         console.log(JSON.stringify(resp));
         this.lstResultadoAvanzado=resp.lstTodasColecciones;
      },
      error=>{
        this.isShowTablePatentes=false;
        this.isShowTableConocimiento=false;
        this.isShowTableAvanzado=true;
        this._spinner.hide();
      }
    );
  }

  doSugerenciaPatentes(event : any){
    // console.log(JSON.stringify(event.query));
    let objJSON={
      vcNombreCientifico: event.query
    };
    // this.vcNombreCientificoSelect.vcNombreCientifico=event.query;
    this._recursoService.getWithPost$(objJSON).subscribe(
      resp=>{
        //  console.log(JSON.stringify(resp));
        this.lstRecursoPatente=resp.lsRecurso;
      },
      error=>{
      }
    );
  }

  doSugerenciaConocimiento(event : any){
    // console.log(JSON.stringify(event.query));
    let objJSON={
      vcNombreCientifico: event.query
    };
    // this.vcNombreCientificoSelect.vcNombreCientifico=event.query;
    this._recursoService.getWithPost$(objJSON).subscribe(
      resp=>{
        //  console.log(JSON.stringify(resp));
        this.lstRecursoConocimiento=resp.lsRecurso;
      },
      error=>{
      }
    );
  }

  doSugerenciaAvanzado(event : any){
    // console.log(JSON.stringify(event.query));
    let objJSON={
      vcNombreCientifico: event.query
    };
    // this.vcNombreCientificoSelect.vcNombreCientifico=event.query;
    this._recursoService.getWithPost$(objJSON).subscribe(
      resp=>{
        //  console.log(JSON.stringify(resp));
        this.lstRecursoAvanzado=resp.lsRecurso;
      },
      error=>{
      }
    );
  }
  doCargarLstGenerales(){
    this._spinner.show();
      let objJSON={};
      this._lstgeneralService.getWithPost$(objJSON).subscribe(
        resp=>{
          this._spinner.hide();
           console.log(JSON.stringify(resp));
              this.lstActividadPatentes=resp.lstActividad;
              this.lstActividadConocimiento=resp.lstActividad;
              this.lstActividadAvanzado=resp.lstActividad;
              this.lstTipoBibliografia=resp.lstTipoBibliografia;
              this.lstPueblo=resp.lstPueblo;
              this.lstTipoConocimiento=resp.lstTipoConocimiento;

        },
        error=>{
          this._spinner.hide();
        }
      );
  }

  doBlInput1(valor :string){
    this.blRadioButton1=valor;
  }

  doBlInput2(valor :string){
    this.blRadioButton2=valor;
  }
  doAgregar2(){
    this.blInputShow2=true;
  }

  doBlInput3(valor :string){
    this.blRadioButton3=valor;
  }
  doAgregar3(){
    this.blInputShow3=true;
  }

  doBlInput4(valor :string){
    this.blRadioButton4=valor;
  }
  doAgregar4(){
    this.blInputShow4=true;
  }

  doBlInput5(valor :string){
    this.blRadioButton5=valor;
  }
  doAgregar5(){
    this.blInputShow5=true;
  }

  doBlInput6(valor :string){
    this.blRadioButton6=valor;
  }
  doAgregar6(){
    this.blInputShow6=true;
  }

  doBlInput7(valor :string){
    this.blRadioButton7=valor;
  }
  doAgregar7(){
    this.blInputShow7=true;
  }

  doBlInput8(valor :string){
    this.blRadioButton8=valor;
  }
  doAgregar8(){
    this.blInputShow8=true;
  }

  doBlInput9(valor :string){
    this.blRadioButton9=valor;
  }
  doAgregar9(){
    this.blInputShow9=true;
  }

  doBlInput10(valor :string){
    this.blRadioButton10=valor;
  }
  doAgregar10(){
    this.blInputShow10=true;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }


}
