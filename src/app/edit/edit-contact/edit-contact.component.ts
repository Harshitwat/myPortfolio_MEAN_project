import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Contact } from 'src/app/main/contact/contact.model';
import { ContactService } from 'src/app/main/contact/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  userID:string;
  contact:Contact={
    _id:'',
    userID:'',
    email:'',
    address:'',
    phoneNumber:0
  };
  form:FormGroup;
  constructor(private route:ActivatedRoute,private Service:ContactService,private router:Router) { }

   onSave(){
    if(this.form.invalid){
     return;
   }
   this.contact.address=this.form.value.address;
   this.contact.email=this.form.value.email;
   this.contact.phoneNumber=this.form.value.phoneNumber;
   this.Service.update(this.contact);
   this.router.navigate(['/edit', this.userID ]);
  }
  ngOnInit(): void {
    this.form=new FormGroup({
      'email':new FormControl(null,{
        validators:[Validators.required,Validators.email]
      }),
      'phoneNumber':new FormControl(null,{
        validators:[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]
      }),
      'address':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.userID=paramMap.get('id');
      this.Service.getContact(this.userID).subscribe(data=>{
        this.contact={
          userID:data[0].userID,
          email:data[0].email,
          address:data[0].address,
          phoneNumber:data[0].phoneNumber,
          _id:data[0]._id
        };
        this.form.patchValue({
          'email':this.contact.email,
          'address':this.contact.address,
          'phoneNumber':this.contact.phoneNumber
        });
        })
    })

  }

}
