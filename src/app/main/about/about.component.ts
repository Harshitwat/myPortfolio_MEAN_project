import { AfterViewChecked, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrimarySkills } from '../../primarySkills.model';
import { PrimarySkillsService } from '../../primarySkills.service';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit,OnDestroy {
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
 primarySkills:PrimarySkills[]=[];
  constructor(private userService:UserService,private primarySkillsService:PrimarySkillsService,public route:ActivatedRoute) {
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
      this.primarySkillsService.getPrimarySkills(paramMap.get('id')).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.primarySkills.push(data[i]) ;
        }
      })
  })
  }
  ngOnDestroy(): void {
  }

}
