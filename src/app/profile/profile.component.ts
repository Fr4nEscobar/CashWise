import { Component, OnInit } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { UserVerificationService } from '../user-verification.service';
import { generate } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  user!: User
  userId!: Number
  userPassword: String = ''
  isData!: boolean
  changeName: string = ''
  changeEmail: string = ''
  changePassword: string = ''
  changeMonthlyB!: number
  changeMonthlyS!: number
  changePreferredC: string = ''

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true
    this.userPassword = this.generateStringByLength(this.user.password!.length)
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
        console.log('Usuario actualizado con éxito:', response)
      },
      error => {
        console.log('El usuario no se puedo actualizar:', error)
      }
      
    )
  }

  generateStringByLength(len: number){
    let pass: String = ''
    for(let i=0; i<len; i++){
      pass+='*'
    }
    return pass
  }

}
