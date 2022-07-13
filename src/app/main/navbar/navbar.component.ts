import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  user:User={
        userID:'',
        firstName:'',
        lastName:'',
        designation:'',
        location:'',
        about:' ',
        pImage:'',
        cImage:'',
        creator:'',
        cvLink:''
  }
  userSub:Subscription
  id:string;
  constructor(private userService:UserService, public route:ActivatedRoute) {
    }

  ngOnInit(): void {

       this.route.paramMap.subscribe((paramMap:ParamMap)=>{
         this.id=paramMap.get('id');
         this.userService.getUser(this.id).subscribe(userData=>{
           this.user={
             userID:userData._id,
             firstName:userData.firstName,
             lastName:userData.lastName,
             designation:userData.designation,
             location:userData.location,
             about:userData.about,
             pImage:userData.pImage,
             cImage:userData.cImage,
             cvLink:userData.cvLink,
             creator:null
           }
         });
     })

  }
  ngOnDestroy(): void {
  }

}
