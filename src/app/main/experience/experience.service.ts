import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Experience } from "./experience.model";

const BACKEND_URL=environment.apiUrl+"/experience/";

@Injectable({providedIn:'root'})
export class ExperienceService{
  private experienceUpdated=new Subject<Experience[]>();
  experience:Experience[]=[];
  constructor(private http:HttpClient){}
  getExperience(userId:string){
    return this.http.get<Experience[]>(BACKEND_URL+userId)
    .pipe(map((data)=>{
      return data.map(e=>{
        return {
          _id:e._id,
          title:e.title,
          desc:e.desc,
          startDate:e.startDate,
          endDate:e.endDate,
          userID:e.userID
        }
      })
    }))
  }
  getExperienceUpdateListener(){
    return this.experienceUpdated.asObservable();
  }
  addExperience(experience:Experience){
    this.http.post<{message:string,psId:string}>(BACKEND_URL,experience)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      experience._id=id;
      this.experience?.push(experience);
      this.experienceUpdated.next([...this.experience]);
    })
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{
      const updatedPS=this.experience.filter(ps=>ps._id!==id);
      this.experience=updatedPS;
      this.experienceUpdated.next([...this.experience]);

    })
  }
}
