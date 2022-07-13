import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Contact } from "./contact.model";

const BACKEND_URL=environment.apiUrl+"/contact/";

@Injectable({providedIn:'root'})
export class ContactService{
  private contactUpdated=new Subject<Contact>();
  contact:Contact;
  constructor(private http:HttpClient){}
  getContact(id:string){
    return this.http.get<{
      _id:string,
      userID:string,
      email:string,
      address:string,
      phoneNumber:number
    }>(BACKEND_URL+id)
  }
  getContactUpdateListener(){
    return this.contactUpdated.asObservable();
  }
  addContact(contact:Contact){

    this.http.post<{message:string,psId:string}>(BACKEND_URL,contact)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      contact._id=id;
      this.contact=contact;
      //this.project?.push(project);
      this.contactUpdated.next(this.contact);
    })
  }
  update(contact:Contact){
    this.http.put(BACKEND_URL+contact.userID,contact)
    .subscribe(response=>{
    })
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{

    })
  }
}
