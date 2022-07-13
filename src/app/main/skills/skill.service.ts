import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Skill } from "./skill.model";

const BACKEND_URL=environment.apiUrl+"/skill/";

@Injectable({providedIn:'root'})
export class SkillService{
  userID="";
  private skillUpdated=new Subject<Skill[]>();
  skills:Skill[]=[  ]
  constructor(
    private http:HttpClient
    ){}
    getSkills(userId:string){
      return this.http.get<Skill[]>(BACKEND_URL+userId)
      .pipe(map((data)=>{
        return data.map(s=>{
          return {
            _id:s._id,
            name:s.name,
            percent:s.percent,
            color:s.color,
            userID:s.userID
          }
        })
      }))
    }

  getSkillUpdateListener(){
    return this.skillUpdated.asObservable();
  }
  addSkill(skill:Skill){
    this.http.post<{message:string,psId:string}>(BACKEND_URL,skill)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      skill._id=id;
      this.skills?.push(skill);
      this.skillUpdated.next([...this.skills]);
    })
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{
      const updatedPS=this.skills.filter(ps=>ps._id!==id);
      this.skills=updatedPS;
      this.skillUpdated.next([...this.skills]);
    })
  }
}
