import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import Axios from 'axios';
import { AppSettingsService } from 'src/app/app-settings.service';

 const baseurl = 'http://localhost:3000/';
 const headers = {
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo = {
    username: "",
    password: ""
  }

  //todo
  submit( ) {
    if (this.loginInfo.username === ""){
      //tratar username vazio

    }
    if(this.loginInfo.password === ""){
      //tratar senha vazia
    }
    
    Axios.post(baseurl + 'users/login/', this.loginInfo, { headers : headers })
      .then((resp) =>{
          if(resp.status === 200){
            localStorage.setItem('username', resp.data._id);
            console.log(localStorage.getItem('username'));
            this.router.navigateByUrl('/questions');
          } else {
          console.log(resp.data)
          }
      })
      .catch((error) => {
        if(error.response){
          console.log(error.response.data)
          console.log(error.response.status)         
        }
      })
  }

  cancel() {
    this.loginInfo.username = ''
    this.loginInfo.password = ''
    this.router.navigateByUrl('/register');
  }

  constructor(private router: Router,
    public settings: AppSettingsService) { 
  }

  ngOnInit() {
    window.localStorage.setItem('username','');
  }

}