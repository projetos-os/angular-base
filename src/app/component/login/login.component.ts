import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: UserService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required]],
      senha:['',[Validators.required]]
    })

  }

  errorLogin: string;
  
  private loginForm:FormGroup;

  ngOnInit() {
    document.body.className = 'hold-transition login-page';

  }

  ngOnDestroy(){
    document.body.className = 'hold-transition skin-blue sidebar-mini';
  }

  get email(){
    return this.loginForm.get('email')
  }

  get senha(){
    return this.loginForm.get('senha')
  }

  logar() {

    if(this.loginForm.invalid){
      this.errorLogin = "Favor verificar os dados informados nos campos E-Mail e Senha"
      return
    }
    
    this.api.login(this.email.value, this.senha.value).subscribe(
      (response) => {
        
        if (response.access_token) {          
          localStorage.setItem('access_token',response.access_token);
          this.router.navigate(['/user'])          
        } else {
          this.errorLogin = "Não foi possível logar com os dados fornecidos.";
        } 
                  
      },(err:HttpErrorResponse)=>{
        this.errorLogin = "Não foi possível logar com os dados fornecidos.";
      });

    
  }

}
