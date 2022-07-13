import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../user.service';
import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  providers:[ExperienceService]
})
export class ExperienceComponent implements OnInit {
experience:Experience[]=[];
userID;
constructor(private experienceService:ExperienceService,private route:ActivatedRoute) {}

ngOnInit(): void {
 this.route.paramMap.subscribe((paramMap:ParamMap)=>{
   this.userID=paramMap.get('id');
   this.experienceService.getExperience(this.userID).subscribe(data=>{
     for (let i = 0; i < data.length; i++) {
       this.experience.push(data[i]) ;
     }
   })
})
}

}
