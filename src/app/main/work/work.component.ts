import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Work } from './work.model';
import { WorkService } from './work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  providers:[WorkService]
})
export class WorkComponent implements OnInit {
  projects:Work[]=[];
  userID;
  constructor(private projectService:WorkService,private route:ActivatedRoute) {}

  ngOnInit(): void {
   this.route.paramMap.subscribe((paramMap:ParamMap)=>{
     this.userID=paramMap.get('id');
     this.projectService.getProject(this.userID).subscribe(data=>{
       for (let i = 0; i < data.length; i++) {
         this.projects.push(data[i]) ;
       }
     })
  })
  }

}
