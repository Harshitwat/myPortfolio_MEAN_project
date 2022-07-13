import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Expertise } from 'src/app/main/expertise/expertise.model';
import { ExpertiseService } from 'src/app/main/expertise/expertise.service';

@Component({
  selector: 'app-edit-expertise',
  templateUrl: './edit-expertise.component.html',
  styleUrls: ['./edit-expertise.component.css']
})
export class EditExpertiseComponent implements OnInit {
  userID:string
  expertise:Expertise[]=[]
  form:FormGroup;
  constructor(private route:ActivatedRoute,private expertiseService:ExpertiseService,private router:Router) { }
  onAddExpertise(){
    const control=new FormGroup({
      'title': new FormControl(null,Validators.required),
         'desc': new FormControl(null,Validators.required),
         'color': new FormControl("1",Validators.required),
         'icon': new FormControl("1",Validators.required),
    });
    (<FormArray>this.form.get('expertise')).push(control);
  }
  onDelete(index){
    (<FormArray>this.form.get('expertise')).removeAt(index);
   }
   onSave(){
    if(this.form.invalid){
     return;
   }
   this.expertiseService.getExpertise(this.userID).subscribe(data=>{
    for (let i = 0; i < data.length; i++) {
      this.expertiseService.delete(data[i]._id);
    }
    for (let index = 0; index < (<FormArray>this.form.get('expertise')).length; index++) {
      this.expertiseService.addExpertise({
        _id:'',
        title:this.form.value.expertise[index].title,
        desc:this.form.value.expertise[index].desc,
        color:this.form.value.expertise[index].color,
        icon:this.form.value.expertise[index].icon,
        userID:this.userID
      });

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
      this.expertise.push(data);
    }
   })

   this.router.navigate(['/edit', this.userID ]);
  }
  ngOnInit(): void {
    this.form=new FormGroup({
      'expertise':new FormArray([])
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.expertiseService.getExpertise(this.userID).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.expertise.push(data[i]);
          const control=new FormGroup({
            'title': new FormControl(data[i].title,Validators.required),
               'desc': new FormControl(data[i].desc,Validators.required),
               'color': new FormControl(data[i].color,Validators.required),
               'icon': new FormControl(data[i].icon,Validators.required),
          });
          (<FormArray>this.form.get('expertise')).push(control);

        }
      })
    })

  }

}
