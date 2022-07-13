import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Work } from 'src/app/main/work/work.model';
import { WorkService } from 'src/app/main/work/work.service';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {
  userID:string
  projects:Work[]=[]
  form:FormGroup;
  constructor(private route:ActivatedRoute,private Service:WorkService,
    private router:Router) { }
  onAdd(){
    const Control=new FormGroup({
      'title': new FormControl(null,Validators.required),
      'link': new FormControl(null,Validators.required)
    });
    (<FormArray>this.form.get('project')).push(Control);
  }
  onDelete(index){
    (<FormArray>this.form.get('project')).removeAt(index);
   }
   onSave(){
    if(this.form.invalid){
     return;
   }
   this.Service.getProject(this.userID).subscribe(data=>{
    for (let i = 0; i < data.length; i++) {
      this.Service.delete(data[i]._id);
    }
    for (let index = 0; index < (<FormArray>this.form.get('project')).length; index++) {
      this.Service.addProject({
        _id:'',
        title:this.form.value.project[index].title,
        link:this.form.value.project[index].link,
        userID:this.userID
      });

    }
     for (let index = 0; index < (<FormArray>this.form.get('project')).length; index++) {
      const data:Work={
        _id:'',
        title:this.form.value.project[index].title,
        link:this.form.value.project[index].link,
        userID:''
      }
      this.projects.push(data);
    }
   })
   this.router.navigate(['/edit', this.userID ]);


  }
  ngOnInit(): void {
    this.form=new FormGroup({
      'project':new FormArray([])
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.Service.getProject(this.userID).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.projects.push(data[i]);
          const Control=new FormGroup({
            'title': new FormControl(data[i].title,Validators.required),
            'link': new FormControl(data[i].link,Validators.required)
          });
          (<FormArray>this.form.get('project')).push(Control);

        }
      })
    })

  }

}
