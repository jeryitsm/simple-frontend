import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = {
    user_firstname: String,
    user_lastname: String,
    user_email: String,
    user_username: String,
    user_password: String,
    user_role: String,
    user_usercread: String,
    user_assignment: Array
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  login(username, password) {
  }
  logout() {
  }
  userCreate(InputUsername, InputPassword, InputFirstName, InputLastName, InputEmail) {
    // console.log(InputUsername,InputPassword,InputFirstName,InputLastName,InputEmail);
    if (InputUsername && InputPassword) {
      let req = {
        user_firstname: InputFirstName,
        user_lastname: InputLastName,
        user_email: InputEmail,
        user_username: InputUsername,
        user_password: InputPassword,
      }
      let result = this.userService.createUser(req);
      result.then(data => {
        if (data !== undefined && data.status) {
          alert("Add User Success!!")
        } else {
          alert("Failed to add user Or This user already exists in the system.")
        }
      })
    } else {
      alert("Incomplete information")
    }
  }
}
