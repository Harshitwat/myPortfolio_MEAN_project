import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Expertise } from './expertise.model';
import { ExpertiseService } from './expertise.service';

@Component({
  selector: 'app-services',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css'],
  providers:[ExpertiseService]
})
export class ExpertiseComponent implements OnInit {
  expertise:Expertise[]=[];
  userID:string;
  constructor(private expertiseService:ExpertiseService,private route:ActivatedRoute) {}

   ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.expertiseService.getExpertise(this.userID).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.expertise.push(data[i]) ;
        }
      })
  })
  }

}
