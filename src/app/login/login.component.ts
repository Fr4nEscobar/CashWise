import { Component } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import { UserVerificationService } from '../user-verification.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userEmail: string="";
  userPassword: string="";
  usersArray: any[]=[];

  constructor(private _CargaScripts: CargarScriptsService, private userVerification: UserVerificationService) {
    _CargaScripts.carga(["logicaAnimacion"])
  }
  
  

  async verifyUserData(): Promise<boolean> {
    try {
      const data = await this.userVerification.bringUsers().toPromise();
  
      if (data) {
        this.usersArray = data;
      } else {
        this.usersArray = [];
      }
  
      let flag = false; 
      this.usersArray.forEach(user => {
        if (user.email === this.userEmail && user.password === this.userPassword) {
          flag = true;
        }
      });
  
      return flag;
    } catch (error) {
      console.error('Error al obtener datos de usuarios', error);
      return false; 
    }
  }
  

  async login() {
    const result = await this.verifyUserData();
    
    if (result) {
      console.log("login exitoso");
    } else {
      console.log("login fallido, datos incorrectos");
    }
  }

}
