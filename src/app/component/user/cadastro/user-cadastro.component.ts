import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { AppSettings } from 'src/app/config/app.settings';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbDatepicker, NgbDate, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-user-cadastro',
  templateUrl: './user-cadastro.component.html',
  styleUrls: ['../user.component.css']
})
export class UserCadastroComponent implements OnInit {


  public usuario: User;
  pageTitle: string;
  sexos = AppSettings.SEXO
  hoje = new Date;
  dataLimite = { 'year': this.hoje.getFullYear(), 'month': this.hoje.getMonth(), 'day': this.hoje.getDay() };
  bc: []
  messageError: string
  resposta: any = { formError: {} }
  idUser: number
  private cadastroForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private api: UserService, private router: Router, private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.usuario = new User();
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"))
    this.createForm();
    if (this.idUser > 0) {
      this.getUser(this.idUser);
    }


  }

  ngOnInit() {

    this.pageTitle = this.route.snapshot.data.pageTitle;
    this.bc = this.route.snapshot.data.bc;
  }

  createForm() {
    this.cadastroForm = this.formBuilder.group({
      email: [this.usuario.email, [Validators.required, Validators.email]],
      nome: [this.usuario.nome, [Validators.required]],
      sexo: [this.usuario.sexo],
      nascimento: [this.usuario.nascimento],
      nacionalidade: [this.usuario.nacionalidade],
      naturalidade: [this.usuario.naturalidade],
      cpf: [this.usuario.cpf, [Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)]]
    })
  }

  getUser(id: number) {
    this.api.getById(id).subscribe(
      response => {
        this.usuario = response

        switch (this.usuario.sexo) {
          case "M":
            this.usuario.sexo = { "id": "M", "name": "Masculino" }
            break;
          case "F":
            this.usuario.sexo = { "id": "F", "name": "Feminino" }
            break;
          case "O":
            this.usuario.sexo = { "id": "O", "name": "Outro" }
            break;
          default:
            break;
        }

        if (this.usuario.nascimento) {
          this.usuario.nascimento = this.setDate(this.usuario.nascimento);          
        }

        this.createForm();
      }
    );
  }

  public salvar() {

    if (this.cadastroForm.invalid) {
      this.messageError = "Favor validar os campos do formulário"
    }

    this.usuario.email = this.cadastroForm.get('email').value;
    let dataForm: NgbDate = this.cadastroForm.get('nascimento').value;
    if (dataForm) {
      this.usuario.nascimento = new Date(dataForm.year, dataForm.month, dataForm.day);
    }
    this.usuario.nome = this.cadastroForm.get('nome').value;
    this.usuario.cpf = this.cadastroForm.get('cpf').value;
    if(this.cadastroForm.get('sexo').value){
      this.usuario.sexo = this.cadastroForm.get('sexo').value.id;
    }    
    this.usuario.nacionalidade = this.cadastroForm.get('nacionalidade').value;
    this.usuario.naturalidade = this.cadastroForm.get('naturalidade').value;


    if (this.usuario.idUser) {
      this.api.update(this.usuario).subscribe(
        (response) => {
          
          this.resposta = response;
          if (response.idUser) {
            this.router.navigate(['/user'])
          } else {
            this.messageError = "Não foi possível salvar.";
          }

        }, (err: HttpErrorResponse) => {

          if (err.error.formError) {
            this.resposta = err.error;
          } else {
            this.messageError = err.error;
          }


        });
    } else {
      this.api.create(this.usuario).subscribe(
        (response) => {
          
          this.resposta = response;
          if (response.idUser) {
            this.router.navigate(['/user'])
          } else {
            this.messageError = "Não foi possível salvar.";
          }

        }, (err: HttpErrorResponse) => {

          if (err.error.formError) {
            this.resposta = err.error;
          } else {
            this.messageError = err.error;
          }


        });
    }



  }


  setDate(date): NgbDateStruct {
    var startDate = new Date(date);
    let startYear = startDate.getUTCFullYear().toString();
    let startMonth = startDate.getUTCMonth().toString();
    let startDay = startDate.getUTCDate().toString()
    
    return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth + "-" + startDay);
  }


}
