import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor() { }

  carga(archivos: { nombre: string, parameters?: { desc: string, days: number, email: string } }[]) {
    for (let archivo of archivos) {
      let script = document.createElement("script")
      script.src = "./assets/" + archivo.nombre + ".js"
      
      if (archivo.parameters) {
        script.setAttribute('data-parameters', JSON.stringify(archivo.parameters))
      }

      let body = document.getElementsByTagName("body")[0]
      body.appendChild(script)
    }
  }
}

