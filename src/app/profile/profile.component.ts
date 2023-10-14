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
  changeName!: string
  changeEmail!: string
  changePassword!: string
  changeMonthlyB!: number
  changeMonthlyS!: number
  changePreferredC!: string

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.email = this.userVariable.getUser()
    this.initUserData()
  }

  async obtainUserData(): Promise<boolean> {
    try {
        const data = await this.userVerification.bringUsers().toPromise();

        if (data) {
            this.usersArray = data;
            const user = this.usersArray.find(user => user.email === this.email);
            if (user) {
                this.user = user;
                return true;
            } else {
                console.log("Usuario no encontrado");
            }
        } else {
            this.usersArray = [];
            console.log("No hay datos de usuarios");
        }

        return false;
    } catch (error) {
        console.error('Error al obtener datos de usuarios', error);
        return false;
    }
}

async initUserData(){
  await this.obtainUserData();
  this.isData = true
}

changeDataUser(){
  this.user.name = this.changeName
}

}
