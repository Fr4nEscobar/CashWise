import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: User
  email!: String
  isData!: boolean

  constructor(private userVariable: UserVariableService) {
    this.initUserData()
  }

  async initUserData(){
    this.user = await this.userVariable.obtainUserData();
    this.isData = true
  }

  calculateRemaining(){
    return 100
  }
}
