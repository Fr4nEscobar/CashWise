import { Component } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _CargaScripts: CargarScriptsService) {
    _CargaScripts.carga(["logicaAnimacion"])
  }
}
