import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  pageTitle:string;
  bc:[]
  usuarios:any


  constructor(private route: ActivatedRoute, private api: UserService) { }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data.pageTitle;
    this.bc = this.route.snapshot.data.bc;

    this.api.getUsuarios().subscribe(
      response => {
        this.usuarios = response.content
      }
    );
  }

}
