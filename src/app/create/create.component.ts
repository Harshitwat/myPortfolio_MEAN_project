import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimarySkills } from '../primarySkills.model';
import { PrimarySkillsService } from '../primarySkills.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { mimeType } from './mime-type.validator';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Expertise } from '../main/expertise/expertise.model';
import { Skill } from '../main/skills/skill.model';
import { Education } from '../main/education/education.model';
import { Experience } from '../main/experience/experience.model';
import { Work } from '../main/work/work.model';
import { Contact } from '../main/contact/contact.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private userService:UserService,private pss:PrimarySkillsService,private router:Router) { }
  primarySkills:PrimarySkills[]=[];
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  expert:Expertise[]=[];
  skills:Skill[]=[]
  educations:Education[]=[];
  experience:Experience[]=[];
  project:Work[]=[];
  pimagePreview:string;
  cimagePreview:string;
  form:FormGroup;
  ngOnInit(): void {
    this.form=new FormGroup({
      'firstName':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      'lastName':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      'designation':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      'currentLocation':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      'cvLink':new FormControl(null,{
        validators:[
          Validators.required,
          Validators.pattern(this.reg)
        ]
      }),
      'about':new FormControl(null,{
        validators:[Validators.required]
      }),
      'profileImage':new FormControl(null,{
        validators:[Validators.required],
        asyncValidators:[mimeType]
      }),
      'coverImage':new FormControl(null,{
        validators:[Validators.required],
        asyncValidators:[mimeType]
      }),
       'ps':new FormArray([
         new FormControl(null,Validators.required)
       ]),
       'expertise':new FormArray([]),
       'skills':new FormArray([]),
       'education':new FormArray([]),
       'experience':new FormArray([]),
       'project':new FormArray([]),

       'email':new FormControl(null,{
        validators:[Validators.required,Validators.email]
      }),
      'phone':new FormControl(null,{
        validators:[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]
      }),
      'address':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),

    })
    const expertiseControl=new FormGroup({
      'title': new FormControl(null,Validators.required),
         'desc': new FormControl(null,Validators.required),
         'color': new FormControl("1",Validators.required),
         'icon': new FormControl("1",Validators.required),
    });
    (<FormArray>this.form.get('expertise')).push(expertiseControl);

    const skillsControl=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'percent': new FormControl(0,Validators.required),
      'color': new FormControl("1",Validators.required)
    });
    (<FormArray>this.form.get('skills')).push(skillsControl);

    const educationControl=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'desc': new FormControl(null,Validators.required),
      'startDate': new FormControl(null,Validators.required),
      'endDate': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('education')).push(educationControl);

    const experienceControl=new FormGroup({
      'title': new FormControl(null,Validators.required),
      'desc': new FormControl(null,Validators.required),
      'startDate': new FormControl(null,Validators.required),
      'endDate': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('experience')).push(experienceControl);
    const projectControl=new FormGroup({
      'title': new FormControl(null,Validators.required),
      'link': new FormControl(null,Validators.required),
    });
    (<FormArray>this.form.get('project')).push(projectControl);
  }
  onAddSkills(){
    (<FormArray>this.form.get('ps')).push(new FormControl(null,Validators.required ))
  }
  onAddEducation(){
    const educationControl=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'desc': new FormControl(null,Validators.required),
      'startDate': new FormControl(null,Validators.required),
      'endDate': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('education')).push(educationControl);
  }
  onAddExperience(){
    const experienceControl=new FormGroup({
      'title': new FormControl(null,Validators.required),
      'desc': new FormControl(null,Validators.required),
      'startDate': new FormControl(null,Validators.required),
      'endDate': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('experience')).push(experienceControl);
  }
  onAddSkill(){
    const skillsControl=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'percent': new FormControl(0,Validators.required),
      'color': new FormControl("1",Validators.required),
    });
    (<FormArray>this.form.get('skills')).push(skillsControl);
  }
  onImagePicked(event:Event,type:string){
    const file=(event.target as HTMLInputElement).files[0];
    if(type==='profileImage')
    this.form.patchValue({profileImage:file});
    else
    this.form.patchValue({coverImage:file});

    this.form.get(type).updateValueAndValidity();
    const reader=new FileReader();
    reader.onload=()=>{
      if(type==='profileImage')
      this.pimagePreview=reader.result as string;
      else
      this.cimagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onAddExpertise(){
    const control=new FormGroup({
      'title': new FormControl(null,Validators.required),
         'desc': new FormControl(null,Validators.required),
         'color': new FormControl("1",Validators.required),
         'icon': new FormControl("1",Validators.required),
    });
    (<FormArray>this.form.get('expertise')).push(control);
  }
  onAddProject(){
    const control=new FormGroup({
      'title': new FormControl(null,Validators.required),
         'link': new FormControl(null,Validators.required),
    });
    (<FormArray>this.form.get('project')).push(control);
  }

  addUser(){

    if(this.form.invalid){
      return;
    }
    const user:User={
      userID:'dummy',
      firstName:this.form.value.firstName,
      lastName:this.form.value.lastName,
      designation:this.form.value.designation,
      about:this.form.value.about,
      location:this.form.value.currentLocation,
      pImage:'',
      cImage:'',
      cvLink:this.form.value.cvLink,
      creator:null
    }
    const contact:Contact={
      _id:'',
      userID:'',
      email:this.form.value.email,
      address:this.form.value.address,
      phoneNumber:this.form.value.phone
    }
    for (let index = 0; index < (<FormArray>this.form.get('ps')).length; index++) {
      this.primarySkills.push({_id:'',name:this.form.value.ps[index],userID:''});

    }
    for (let index = 0; index < (<FormArray>this.form.get('expertise')).length; index++) {
      const data:Expertise={
        _id:'',
        title:this.form.value.expertise[index].title,
        desc:this.form.value.expertise[index].desc,
        color:this.form.value.expertise[index].color,
        icon:this.form.value.expertise[index].icon,
        userID:''
      }
      this.expert.push(data);
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
    for (let index = 0; index < (<FormArray>this.form.get('education')).length; index++) {
      const data:Education={
        _id:'',
        name:this.form.value.education[index].name,
        desc:this.form.value.education[index].desc,
        startDate:this.form.value.education[index].startDate,
        endDate:this.form.value.education[index].endDate,
        userID:''
      }
      this.educations.push(data);
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
    for (let index = 0; index < (<FormArray>this.form.get('project')).length; index++) {
      const data:Work={
        _id:'',
        title:this.form.value.project[index].title,
        link:this.form.value.project[index].link,
        userID:''
      }
      this.project.push(data);
    }
    this.userService.addUser(
      user,
      this.primarySkills,
      this.form.value.profileImage,
      this.form.value.coverImage,
      this.expert,
      this.skills,
      this.educations,
      this.experience,
      this.project,
      contact
      );

   this.form.reset();
   this.router.navigate(['/']);
  }
}
