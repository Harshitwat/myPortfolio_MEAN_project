import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-portfolios',
  templateUrl: './my-portfolios.component.html',
  styleUrls: ['./my-portfolios.component.css']
})
export class MyPortfoliosComponent implements OnInit, OnDestroy {

  users:User[]=[];
  userSub:Subscription;
  mode='all';
  userIsAuthenticated=false;
  authId:string;
  private authStatusSub:Subscription;
  constructor(private userService:UserService, private authService:AuthService, private route:ActivatedRoute) {
  }

  onDelete(id:string){
    this.userService.deleteUser(id);
  }
  ngOnInit(): void {
    if(this.route.toString()===`Route(url:'myPortfolios', path:'myPortfolios')`)
      this.mode='mine';

    this.authId=this.authService.getAuthId();

    this.userService.getUsers();
    this.userSub= this.userService
    .getUsersUpdateListener()
     .subscribe((users:User[])=>{
       if(this.mode=='all')
        this.users=users
        else
        this.users=users.filter(port=>port.creator===this.authId);

     });
     this.userIsAuthenticated=this.authService.getIsAuth()
    this.authStatusSub= this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.authId=this.authService.getAuthId();
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
