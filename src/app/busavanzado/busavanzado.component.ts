import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-busavanzado',
  templateUrl: './busavanzado.component.html',
  styleUrls: ['./busavanzado.component.css']
})
export class BusavanzadoComponent implements OnInit {

  modalRef: BsModalRef;

  blShowTT : boolean =false;

  text: any[];

  results: any[];

  cities: any[];

  selectedCities: any[];

  orderForm: FormGroup;
  items: FormArray;

  stateOptions: any[];
  value1: string = "off";

  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder  ) { 

    this.cities = [
      {name: 'Abortivo', code: 'NY'},
      {name: 'Adicciones', code: 'RM'},
      {name: 'Amebicida', code: 'LDN'},
      {name: 'Anorexia', code: 'IST'},
      {name: 'Alimento', code: 'PRS'}
  ];
  
  this.stateOptions = [{label: 'Y', value: 'Y'}, {label: 'O', value: 'O'}];

  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([this.createItem()])
    });
  }

  search(event) {
    this.results=[ 
      {"name":"Lepidium 1"},
      {"name":"Lepidium 2"},
      {"name":"Lepidium 3"},
      {"name":"Lepidium 4"},
      {"name":"Lepidium 5"}
  ];

    // this.countrylookupservice.getCountries().then(data => {
      // this.results = data;
  // });
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

doComboTipoConocimiento(){
  this.blShowTT=!this.blShowTT;
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }


}
