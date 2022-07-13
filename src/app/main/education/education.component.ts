import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../user.service';
import { Education } from './education.model';
import { EducationService } from './education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  providers:[EducationService]
})
export class EducationComponent implements OnInit {
education:Education[]=[];
userID;
constructor(private educationExpertise:EducationService,private route:ActivatedRoute) {}

ngOnInit(): void {
 this.route.paramMap.subscribe((paramMap:ParamMap)=>{
   this.userID=paramMap.get('id');
   this.educationExpertise.getEducation(this.userID).subscribe(data=>{
     for (let i = 0; i < data.length; i++) {
       this.education.push(data[i]) ;
     }
   })
})
}

}
