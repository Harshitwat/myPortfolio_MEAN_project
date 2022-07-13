import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Skill } from 'src/app/main/skills/skill.model';
import { SkillService } from 'src/app/main/skills/skill.service';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.css']
})
export class EditSkillsComponent implements OnInit {

  userID:string
  skills:Skill[]=[]
  form:FormGroup;
  constructor(private route:ActivatedRoute,private skillService:SkillService,
    private router:Router) { }
  onAddSkill(){
    const skillsControl=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'percent': new FormControl(0,Validators.required),
      'color': new FormControl("1",Validators.required),
    });
    (<FormArray>this.form.get('skills')).push(skillsControl);
  }
  onDelete(index){
    (<FormArray>this.form.get('skills')).removeAt(index);
   }
   onSave(){
    if(this.form.invalid){
     return;
   }
   this.skillService.getSkills(this.userID).subscribe(data=>{
    for (let i = 0; i < data.length; i++) {
      this.skillService.delete(data[i]._id);
    }
    for (let index = 0; index < (<FormArray>this.form.get('skills')).length; index++) {
      this.skillService.addSkill({
        _id:'',
        name:this.form.value.skills[index].name,
        percent:this.form.value.skills[index].percent,
        color:this.form.value.skills[index].color,
        userID:this.userID
      });

    }
     for (let index = 0; index < (<FormArray>this.form.get('skills')).length; index++) {
      const data:Skill={
        _id:'',
        name:this.form.value.skills[index].name,
        percent:this.form.value.skills[index].percent,
        color:this.form.value.skills[index].color,
        userID:''
      }
      this.skills.push(data);
    }
   })
   this.router.navigate(['/edit', this.userID ]);

  }
  ngOnInit(): void {
    this.form=new FormGroup({
      'skills':new FormArray([])
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.skillService.getSkills(this.userID).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.skills.push(data[i]);
          const skillsControl=new FormGroup({
            'name': new FormControl(data[i].name,Validators.required),
            'percent': new FormControl(data[i].percent,Validators.required),
            'color': new FormControl(data[i].color,Validators.required),
          });
          (<FormArray>this.form.get('skills')).push(skillsControl);

        }
      })
    })

  }
}
