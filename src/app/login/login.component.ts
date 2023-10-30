import { Component } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import { UserVerificationService } from '../user-verification.service';
import { User } from './user.model';
import { Router } from '@angular/router';
import { UserVariableService } from '../user-variable.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  registerName: string = "";
  registerEmail: string = "";
  registerPassword: string = "";
  userEmail: string = "";
  userPassword: string = "";
  usersArray: any[] = [];
  showSidebar: boolean = false;
  user!: User

  constructor(private _CargaScripts: CargarScriptsService, private userVerification: UserVerificationService, private router: Router, private userVariable: UserVariableService) {
    _CargaScripts.carga(["logicaAnimacion"])

  }


  async verifyUserData(email: string, numero: number): Promise<boolean> {
    try {
      let flag = false;
      const data = await this.userVerification.bringUser(email).toPromise();

      if (data) {
        this.user = data[0]
      } else {
        this.user = new User('', '', '')
      }

      if (numero === 1) {
        if(this.user.password === this.userPassword) {
          this.userVariable.setUser(this.user)
          flag = true
        }
      } else {
        if(this.user.name === '') {
        flag = false
       }
      }
      return flag;


    } catch (error) {
      console.error('Error al obtener datos de usuarios', error);
      return false;
    }
  }


  async login() {
    const result = await this.verifyUserData(this.userEmail, 1);

    if (result) {
      console.log("login exitoso");
      
      this.router.navigate(['/home'])
    } else {
      console.log("login fallido, datos incorrectos");
    }
  }

  async register() {
    const result = await this.verifyUserData(this.registerEmail, 0);

    let user = new User(this.registerName, this.registerEmail, this.registerPassword);

    if (result) {
      console.log("El usuario ya esta registrado");
    } else {
      this.userVerification.addUser(user).subscribe(
        response => {
          this.userVariable.setUser(user)
          console.log('Usuario registrado con éxito:', response);
          this.router.navigate(['/home'])
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}
