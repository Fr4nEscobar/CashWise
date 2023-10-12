import { Component } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import { UserVerificationService } from '../user-verification.service';
import { User } from './user.model';
import { Router } from '@angular/router';


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

  constructor(private _CargaScripts: CargarScriptsService, private userVerification: UserVerificationService, private router: Router) {
    _CargaScripts.carga(["logicaAnimacion"])

  }

usuarioAutenticado: boolean = false

  async verifyUserData(numero: number): Promise<boolean> {
    try {
      const data = await this.userVerification.bringUsers().toPromise();
      let flag = false;

      if (data) {
        this.usersArray = data;
      } else {
        this.usersArray = [];
      }

      if (numero === 1) {
        this.usersArray.forEach(user => {
          if (user.email === this.userEmail) {
            if (user.password === this.userPassword) {
              flag = true;
            }

          }
        });
      } else {
        this.usersArray.forEach(user => {
          if (user.email === this.registerEmail) {
            flag = true;
          }
        });
      }
      return flag;


    } catch (error) {
      console.error('Error al obtener datos de usuarios', error);
      return false;
    }
  }


  async login() {
    const result = await this.verifyUserData(1);

    if (result) {
      console.log("login exitoso");
      this.usuarioAutenticado = true;
      this.router.navigate(['/home'])
    } else {
      console.log("login fallido, datos incorrectos");
    }
  }

  async register() {
    const result = await this.verifyUserData(0);

    let user = new User(this.registerName, this.registerEmail, this.registerPassword);

    if (result) {
      console.log("El usuario ya esta registrado");
    } else {
      this.userVerification.addUser(user).subscribe(
        response => {
          console.log('Usuario registrado con éxito:', response);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}
