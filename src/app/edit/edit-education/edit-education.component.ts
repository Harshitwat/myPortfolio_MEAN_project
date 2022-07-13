import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Education } from 'src/app/main/education/education.model';
import { EducationService } from 'src/app/main/education/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  userID:string
  education:Education[]=[]
  form:FormGroup;
  constructor(private route:ActivatedRoute,private educationService:EducationService,private router:Router) { }
  onAddEducation(){
    const educationControl=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'desc': new FormControl(null,Validators.required),
      'startDate': new FormControl(null,Validators.required),
      'endDate': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('education')).push(educationControl);
  }
  onDelete(index){
    (<FormArray>this.form.get('education')).removeAt(index);
   }
   onSave(){
    if(this.form.invalid){
     return;
   }
   this.educationService.getEducation(this.userID).subscribe(data=>{
    for (let i = 0; i < data.length; i++) {
      this.educationService.delete(data[i]._id);
    }
    for (let index = 0; index < (<FormArray>this.form.get('education')).length; index++) {
      this.educationService.addEducation({
        _id:'',
        name:this.form.value.education[index].name,
        desc:this.form.value.education[index].desc,
        startDate:this.form.value.education[index].startDate,
        endDate:this.form.value.education[index].endDate,
        userID:this.userID
      });

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
      this.education.push(data);
    }
   })

   this.router.navigate(['/edit', this.userID ]);
  }
  ngOnInit(): void {
    this.form=new FormGroup({
      'education':new FormArray([])
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.educationService.getEducation(this.userID).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.education.push(data[i]);
          const educationControl=new FormGroup({
            'name': new FormControl(data[i].name,Validators.required),
            'desc': new FormControl(data[i].desc,Validators.required),
            'startDate': new FormControl(data[i].startDate,Validators.required),
            'endDate': new FormControl(data[i].endDate,Validators.required)
          });
          (<FormArray>this.form.get('education')).push(educationControl);

        }
      })
    })

  }


}
