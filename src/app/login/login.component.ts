import { Component } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import { UserVerificationService } from '../user-verification.service';
import { User } from './user.model';
import { Router } from '@angular/router';
import { UserVariableService } from '../user-variable.service';
import { LoginVerificationService } from '../login-verification.service';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';



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
  userId!: number
  signUpMessage: string = ''
  signInMessage: string = ''
  registerForm!: FormGroup
  messageName: string = ''
  messageEmail: string = ''
  messagePassword: string = ''


  constructor(private _CargaScripts: CargarScriptsService, private userVerification: UserVerificationService, private router: Router, private userVariable: UserVariableService, private formBuilder: FormBuilder, private loginVer: LoginVerificationService) {
    _CargaScripts.carga([
      { nombre: 'logicaAnimacion'}])
    this.loginVer.logOut()
    this.registerForm = this.formBuilder.group({ name: ['', [Validators.required]], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)+/), Validators.minLength(6), Validators.maxLength(28)]] })
    this.registerEmail = this.getEmail()
    this.registerPassword = this.getPassword()
    this.registerName = this.getName()
  }

  verifyPassword(){
    const password = this.registerForm.get('password')
    if(password?.invalid && (password.touched || password.dirty)) {
      this.messagePassword = 'Invalid password (at least a capital letter, a lowercase letter and a number needed, 6-38 characters lenght)'
    } else {
      this.messagePassword = ''
    }
  }

  verifyEmail() {
    const email = this.registerForm.get('email')
    if(email?.invalid && (email.touched || email.dirty)) {
      this.messageEmail = 'Invalid email'
    } else {
      this.messageEmail = ''
    }
  }

  verifyName() {
    const name = this.registerForm.get('name')
    if(name?.invalid && (name.touched || name.dirty)) {
      this.messageName = 'Invalid name'
    } else {
      this.messageName = ''
    }
  }

  getEmail() {
    return this.registerForm.get('email')!.value
  }

  getPassword() {
    return this.registerForm.get('password')!.value
  }

  getName() {
    return this.registerForm.get('name')!.value
  }




  async verifyUserData(email: string, numero: number): Promise<boolean> {
    try {
      let flag = false;
      const data = await this.userVerification.bringUser(email).toPromise();

      if (data) {
        this.user = data[0]
        this.user.monthlyIncome = parseFloat(data[0].monthlyIncome)
        this.user.monthlyBudget = parseFloat(data[0].monthlyBudget)
        this.user.totalIncome = parseFloat(data[0].totalIncome)
        this.user.totalSpend = parseFloat(data[0].totalSpend)
        this.userId = parseInt(data[0].id)
      } else {
        this.user = new User('', '', '')
      }

      if (numero === 1) {
        if (this.user.password === this.userPassword) {
          flag = true
        }
      } else {
        if (this.user.name === '') {
          flag = false
        }else{
          flag = true
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
      this.userVariable.setUser(this.user, this.userId)
      this.signInMessage = ''
      this.loginVer.logIn()
      this.router.navigate(['/home'])
    } else {
      this.signInMessage = ''
      this.signInMessage = 'Incorrect Email or Password'

    }
  }

  async register() {
    this.registerEmail = this.getEmail()
    this.registerPassword = this.getPassword()
    this.registerName = this.getName()

    const result = await this.verifyUserData(this.registerEmail, 0);

    let user = new User(this.registerName, this.registerEmail, this.registerPassword);

    if (result) {
      alert('The email has already registered')
    } else {
      this.userVerification.addUser(user).subscribe(
        response => {
          this.signUpMessage = ''
          this.userVariable.setUser(user, this.userId)
        },
        error => {
          this.signUpMessage = ''
          this.signUpMessage = 'An error has occurred while registering your user, please try again later'
        }
      );
    }
  }
}