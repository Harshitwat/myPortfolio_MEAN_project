import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Expertise } from "./expertise.model";

const BACKEND_URL=environment.apiUrl+"/expertise/";

@Injectable({providedIn:'root'})
export class ExpertiseService{
  userID=" ";
  private expertiseUpdated=new Subject<Expertise[]>();
  expertises:Expertise[]=[]
  constructor(private http:HttpClient){}
  getExpertise(userId:string){
    return this.http.get<Expertise[]>(BACKEND_URL+userId)
    .pipe(map((data)=>{
      return data.map(e=>{
        return {
          _id:e._id,
          title:e.title,
          desc:e.desc,
          color:e.color,
          icon:e.icon,
          userID:e.userID
        }
      })
    }))
  }
  getExpertiseUpdateListener(){
    return this.expertiseUpdated.asObservable();
  }
  addExpertise(expertise:Expertise){
    this.http.post<{message:string,psId:string}>(BACKEND_URL,expertise)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      expertise._id=id;
      this.expertises?.push(expertise);
      this.expertiseUpdated.next([...this.expertises]);
    })
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{
      const updatedPS=this.expertises.filter(ps=>ps._id!==id);
      this.expertises=updatedPS;
      this.expertiseUpdated.next([...this.expertises]);

    })
  }
}
