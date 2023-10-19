import { Injectable } from '@angular/core';
import { User } from './login/user.model';
import { UserVerificationService } from './user-verification.service';

@Injectable({
  providedIn: 'root'
})

export class UserVariableService {
  value!: any
  usersArray!: any[]
  email!: string
  userPassword!: String
  userId!: number

  constructor( private userVerification: UserVerificationService) { 

  }

  async obtainUserData(): Promise<any> {
    try {
        const data = await this.userVerification.bringUsers().toPromise();
        if (data) {
            this.usersArray = data;
            let user!: any
            //const user = this.usersArray.find(user => user.email === this.email);
            for (const us of this.usersArray) {
              if(us.email === this.email){
                user = us
              }
            }
            console.log(data)
            if (user) {
                this.userId = user.id
                this.userPassword = user.password
                return user;
            } else {
                console.log("Usuario no encontrado");
            }
        } else {
            this.usersArray = [];
            console.log("No hay datos de usuarios");
        }

        return null;
    } catch (error) {
        console.error('Error al obtener datos de usuarios', error);
        return null;
    }
}

  setUser(value: any) {
    this.email = value;
  }

}
