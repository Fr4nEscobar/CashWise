import { Component, OnInit } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { UserVerificationService } from '../user-verification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  email!: string
  user!: User
  usersArray!: any[]
  isData!: boolean
  changeName: string = ''
  changeEmail: string = ''
  changePassword: string = ''
  changeMonthlyB!: number
  changeMonthlyS!: number
  changePreferredC: string = ''
  userId!: number

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.email = this.userVariable.getUser()
    this.initUserData()
  }

  async obtainUserData(): Promise<number> {
    try {
        const data = await this.userVerification.bringUsers().toPromise();

        if (data) {
            this.usersArray = data;
            const user = this.usersArray.find(user => user.email === this.email);
            if (user) {
                this.user = user;
                this.changePreferredC = this.user.preferredCurrency
                return user.id;
            } else {
                console.log("Usuario no encontrado");
            }
        } else {
            this.usersArray = [];
            console.log("No hay datos de usuarios");
        }

        return -1;
    } catch (error) {
        console.error('Error al obtener datos de usuarios', error);
        return -1;
    }
}

async initUserData(){
  this.userId = await this.obtainUserData();
  this.isData = true
}

changeDataUser(){
  if (this.changeName !== '') {
    this.user.name = this.changeName
  } 
  if (this.changeEmail !== '') {
    this.user.email = this.changeEmail
  }
  if (this.changePassword !== '') {
    this.user.password = this.changePassword
  } 
  if (this.changeMonthlyB !== undefined) {
    this.user.monthlyBudget = this.changeMonthlyB
  } 
  if (this.changeMonthlyS !== undefined) {
    this.user.monthlySpend = this.changeMonthlyS
  } 
  if (this.changePreferredC !== this.user.preferredCurrency) {
    this.user.preferredCurrency = this.changePreferredC
  } 
  
  this.userVerification.updateUser(this.user, this.userId).subscribe(
    response => {
      console.log('Usuario actualizado con éxito:', response);
    },
    error => {
      console.log('El usuario no se puedo actualizar:', error);
    }
    
  )
}

}
