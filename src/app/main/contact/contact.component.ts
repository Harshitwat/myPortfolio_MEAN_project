import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService]
})
export class ContactComponent implements OnInit {
  contact:Contact={
    _id:'',
    userID:'',
    email:'',
    address:'',
    phoneNumber:0
  };
  userID;
  constructor(private Service:ContactService,private route:ActivatedRoute) {}

  ngOnInit(): void {
   this.route.paramMap.subscribe((paramMap:ParamMap)=>{
     this.userID=paramMap.get('id');
     this.Service.getContact(this.userID).subscribe(data=>{
      this.contact=data[0];
     })
  })
  }

}
