import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrimarySkills } from 'src/app/primarySkills.model';
import { PrimarySkillsService } from 'src/app/primarySkills.service';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';

import { mimeType } from '../../create/mime-type.validator';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit, OnDestroy {
user:User;
data:string='';
userID:string;
reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
primarySkills:PrimarySkills[]=[];
psSub:Subscription
pimagePreview:string;
  cimagePreview:string;
form:FormGroup;
  constructor(private userService:UserService,
    private primarySkillsService:PrimarySkillsService,
    public route:ActivatedRoute,
    private router:Router) {}
  ngOnInit(): void {
    this.psSub= this.primarySkillsService
    .getPSUpdateListener()
     .subscribe((ps:PrimarySkills[])=>{
        this.primarySkills=ps;

     });
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
          Validators.pattern(this.reg)//,
         // Validators.pattern('[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')
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
       'ps':new FormArray([])
    })
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
          this.userID=paramMap.get('id');
          this.userService.getUser(paramMap.get('id')).subscribe(userData=>{
            this.user={
              userID:userData._id,
              firstName:userData.firstName,
              lastName:userData.lastName,
              designation:userData.designation,
              location:userData.location,
              about:userData.about,
              pImage:userData.pImage,
              cImage:userData.cImage,
              cvLink:userData.cvLink,
              creator:null
            }
            this.primarySkillsService.getPrimarySkills(paramMap.get('id')).subscribe(data=>{
              for (let i = 0; i < data.length; i++) {
                this.primarySkills.push(data[i]) ;
                (<FormArray>this.form.get('ps')).push(new FormControl(data[i].name,Validators.required ))
                this.primarySkillsService.primarySkills.push(data[i]);
              }
              this.form.patchValue({
                'firstName':this.user.firstName,
                'lastName':this.user.lastName,
                'designation':this.user.designation,
                'currentLocation':this.user.location,
                'about':this.user.about,
                'cvLink':this.user.cvLink,
                'profileImage':this.user.pImage,
                'coverImage':this.user.cImage,
              });
            })
          });
      })
  }

   onSave(){
     if(this.form.invalid){
      return;
    }
    const updateUser:User={
      userID:this.user.userID,
      firstName:this.form.value.firstName,
      lastName:this.form.value.lastName,
      designation:this.form.value.designation,
      about:this.form.value.about,
      location:this.form.value.currentLocation,
      pImage:this.form.value.profileImage,
      cImage:this.form.value.coverImage,
      cvLink:this.form.value.cvLink,
      creator:null
    }
     this.userService.updateUser(updateUser,this.form.value.profileImage,this.form.value.coverImage);
     this.primarySkillsService.getPrimarySkills(this.userID).subscribe(data=>{
      for (let i = 0; i < data.length; i++) {
        this.primarySkillsService.delete(data[i]._id);
      }
      for (let index = 0; index < (<FormArray>this.form.get('ps')).length; index++) {
        this.primarySkillsService.addPrimarySkills({_id:'',name:this.form.value.ps[index],userID:this.userID});
      }
     })
     this.router.navigate(['/edit', this.userID ]);
   }
   onDelete(index){
    (<FormArray>this.form.get('ps')).removeAt(index);
   }
   onAddSkills(){
    (<FormArray>this.form.get('ps')).push(new FormControl(null,Validators.required ))
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

  ngOnDestroy(): void {
    this.psSub.unsubscribe();
  }


}
