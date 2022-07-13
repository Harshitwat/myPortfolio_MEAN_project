import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Experience } from 'src/app/main/experience/experience.model';
import { ExperienceService } from 'src/app/main/experience/experience.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  userID:string
  experience:Experience[]=[]
  form:FormGroup;
  constructor(private route:ActivatedRoute,private Service:ExperienceService,
    private router:Router) { }
  onAddExperience(){
    const Control=new FormGroup({
      'title': new FormControl(null,Validators.required),
      'desc': new FormControl(null,Validators.required),
      'startDate': new FormControl(null,Validators.required),
      'endDate': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('experience')).push(Control);
  }
  onDelete(index){
    (<FormArray>this.form.get('experience')).removeAt(index);
   }
   onSave(){
    if(this.form.invalid){
     return;
   }
   this.Service.getExperience(this.userID).subscribe(data=>{
    for (let i = 0; i < data.length; i++) {
      this.Service.delete(data[i]._id);
    }
    for (let index = 0; index < (<FormArray>this.form.get('experience')).length; index++) {
      this.Service.addExperience({
        _id:'',
        title:this.form.value.experience[index].title,
        desc:this.form.value.experience[index].desc,
        startDate:this.form.value.experience[index].startDate,
        endDate:this.form.value.experience[index].endDate,
        userID:this.userID
      });

    }
     for (let index = 0; index < (<FormArray>this.form.get('experience')).length; index++) {
      const data:Experience={
        _id:'',
        title:this.form.value.experience[index].title,
        desc:this.form.value.experience[index].desc,
        startDate:this.form.value.experience[index].startDate,
        endDate:this.form.value.experience[index].endDate,
        userID:''
      }
      this.experience.push(data);
    }
   })
   this.router.navigate(['/edit', this.userID ]);

  }
  ngOnInit(): void {
    this.form=new FormGroup({
      'experience':new FormArray([])
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.Service.getExperience(this.userID).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.experience.push(data[i]);
          const Control=new FormGroup({
            'title': new FormControl(data[i].title,Validators.required),
            'desc': new FormControl(data[i].desc,Validators.required),
            'startDate': new FormControl(data[i].startDate,Validators.required),
            'endDate': new FormControl(data[i].endDate,Validators.required)
          });
          (<FormArray>this.form.get('experience')).push(Control);

        }
      })
    })

  }
}
