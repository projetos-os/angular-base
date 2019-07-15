import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-del',
  templateUrl: './user-del.component.html',
  styleUrls: ['../user.component.css']
})
export class UserDelComponent implements OnInit {



  pageTitle: string;
  bc: []
  messageError: string
  resposta: any = { formError: {} }
  idUser: number


  constructor(private route: ActivatedRoute, private api: UserService, private router: Router) {
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"))
  }

  ngOnInit() {

    this.pageTitle = this.route.snapshot.data.pageTitle;
    this.bc = this.route.snapshot.data.bc;
  }





  public excluir() {


    this.api.del(this.idUser).subscribe(
      (response) => {

        this.router.navigate(['/user'])

      }, (err: HttpErrorResponse) => {

        if (err.error.formError) {
          this.resposta = err.error;
        } else {
          this.messageError = err.error;
        }


      });

  }



}
