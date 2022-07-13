import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../user.service';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  providers:[SkillService]
})
export class SkillsComponent implements OnInit {
skills:Skill[]=[];
userID;
constructor(private skillService:SkillService,private route:ActivatedRoute) {}

ngOnInit(): void {
 this.route.paramMap.subscribe((paramMap:ParamMap)=>{
   this.userID=paramMap.get('id');
   this.skillService.getSkills(this.userID).subscribe(data=>{
     for (let i = 0; i < data.length; i++) {
       this.skills.push(data[i]) ;
     }
   })
})
}

}
