import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../../components/base/header/header.component";
import { Router } from '@angular/router';
import { APICarService } from 'src/app/services/API/apicar.service';
import { CarColor, CarManufacturer, CarModel, CarYear } from 'src/app/models/querysapis/carapi.info';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, map, startWith } from 'rxjs';
import { MaskitoModule } from '@maskito/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Car } from 'src/app/models/driver/cardriver.info';
import { DriverRequest, FormDriverMaker } from 'src/app/models/driver/form.info';
import { ManageLocalData } from 'src/app/utils/manage.localdata';
import { FormService } from 'src/app/services/form/form.service';
import { UserLocalData } from 'src/app/models/user/user.info';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.page.html',
    styleUrls: ['./driver.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent,
      MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule,
      MaskitoModule]
})
export class DriverPage implements OnInit {

  readonly titlePage = 'Formulario Solicitud';

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly mascaraPatente: MaskitoOptions = {
    mask: [/^[a-z1-9\s]+$/i, /^[a-z1-9\s]+$/i, '·',/^[a-z1-9\s]+$/i, /^[a-z1-9\s]+$/i, '·', /^[a-z1-9\s]+$/i, /^[a-z1-9\s]+$/i],
    postprocessors: [
      ({value, selection}) => ({value: value.toUpperCase(), selection}),
    ],
  };
  userData!: UserLocalData;
  requestForm: DriverRequest;

  controlManufacturer = new FormControl<string>('');
  controlModel = new FormControl<string>('');
  controlYear = new FormControl<string>('');
  controlColor = new FormControl<string>('');

  filteredManufacturersOptions: Observable<CarManufacturer[]>;
  filteredModelsOptions!: Observable<CarModel[]>;
  filteredYearsOptions!: Observable<string[]>;
  filteredColorsOptions!: Observable<CarColor[]>;

  listManufacturers: CarManufacturer[] = [];
  listModels: CarModel[] = [];
  listYears: string[] = [];
  listColors: CarColor[] = [];

  checkoutForm = this.formBuilder.group({
    patente: '',
    permisoCirculacion: false,
    asientos: 0
  })

  constructor(
    private router: Router,
    private apiService: APICarService,
    private formBuilder: FormBuilder,
    private formService: FormService,
  ) { 
    this.userData = ManageLocalData.getLocalData();
    this.requestForm = FormDriverMaker.basicInformation(this.userData.email, this.userData.userInfo?.nombre || '', this.userData.userInfo?.carreraUniv || '');

    apiService.getManufacturersData().subscribe( result => this.listManufacturers = result.data );

    this.filteredManufacturersOptions = this.controlManufacturer.valueChanges.pipe(
      startWith(''),
      map(value =>{
        return value ? this._filter(value, 1) : this.listManufacturers.slice();
      })
    );

    this.filteredModelsOptions = this.controlModel.valueChanges.pipe(
      startWith(''),
      map(value =>{
        return value ? this._filter(value, 2) : this.listModels.slice();
      })
    );

    this.filteredYearsOptions = this.controlYear.valueChanges.pipe(
      startWith(''),
      map(value =>{
        return value ? this._filter(value, 3) : this.listYears.slice();
      })
    );

    this.filteredColorsOptions = this.controlColor.valueChanges.pipe(
      startWith(''),
      map(value =>{
        return value ? this._filter(value, 4) : this.listColors.slice();
      })
    );
  }

  ngOnInit() {
  }

  displayFn(nameManufacturer: string): string {
    return nameManufacturer;
  }

  isModelsData(){
    return this.listModels.length > 0;
  }

  isYearsData(){
    return this.listYears.length > 0;
  }

  isColorData(){
    return this.listColors.length > 0;
  }

  changedManufacturerValue(manufacturer: CarManufacturer){
    this.listModels = [];
    this.listYears = [];
    this.listColors = [];

    this.requestForm.vehicleStudent.marca = manufacturer.name;
    this.apiService.getModelsData(manufacturer.id).subscribe(result => { this.listModels = result.data; });
  }

  changedModelValue(model: CarModel){
    this.listYears = [];
    this.listColors = [];

    this.requestForm.vehicleStudent.modelo = model.name;
    this.apiService.getYearsData(model).subscribe(result => { this.listYears = result; });
  }

  changedYearValue(year: string){
    this.listColors = [];

    this.requestForm.vehicleStudent.annoVehiculo = Number(year);

    this.apiService.getColorData(
      this.requestForm.vehicleStudent.marca,
      this.requestForm.vehicleStudent.modelo,
      year
    ).subscribe(result => { 
      this.listColors = result.data as CarColor[]; 
    });
  }

  changedColorValue(color: CarColor){
    this.requestForm.vehicleStudent.color = color.name;
  }

  onSubmitForm(){
    const infoForm: Car = this.checkoutForm.value as Car;

    this.requestForm.vehicleStudent.patente = infoForm.patente;
    this.requestForm.vehicleStudent.asientos = infoForm.asientos;
    this.requestForm.vehicleStudent.permisoCirculacion = infoForm.permisoCirculacion;
    this.requestForm.vehicleStudent.dueno = this.userData.email;
    
    this.checkoutForm.reset();
    this.formService.saveRequest(this.requestForm);
  }

  private _filter(object: string, option: number): any {
    switch (option) {
      case 1:
        return this.listManufacturers.filter(option => option.name.toLowerCase().includes(object.toLowerCase()));
      case 2:
        return this.listModels.filter(option => option.name.toLowerCase().includes(object.toLowerCase()));
      case 3:
        return this.listYears.filter(option => String(option).includes(object));
      case 4:
        return this.listColors.filter(option => option.name.toLowerCase().includes(object.toLowerCase()));
      default:
        break;
    }
  }
}
