import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  user:User={
    userID:'',
      firstName:'',
      lastName:'',
      designation:'',
      location:'',
      about:'',
      pImage:'',
      cImage:'',
      cvLink:'',
      creator:null
  };
userSub:Subscription;
  constructor(private userService:UserService,public route:ActivatedRoute) {
   }

   ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userService.getUser(paramMap.get('id')).subscribe(userData=>{
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
