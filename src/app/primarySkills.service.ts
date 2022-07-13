import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PrimarySkills } from "./primarySkills.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

const BACKEND_URL=environment.apiUrl+"/primarySkills/";

@Injectable({providedIn:'root'})
export class PrimarySkillsService{
  primarySkills:PrimarySkills[]=[]
  private psUpdated=new Subject<PrimarySkills[]>();
  constructor(private http:HttpClient){}
  getPSUpdateListener(){
    return this.psUpdated.asObservable();
  }
  getPrimarySkills(userId:string){
    return this.http.get<PrimarySkills[]>(BACKEND_URL+userId)
    .pipe(map((data)=>{
      return data.map(ps=>{
        return {
          _id:ps._id,
          name:ps.name,
          userID:ps.userID
        }
      })
    }))
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{
      const updatedPS=this.primarySkills.filter(ps=>ps._id!==id);
      this.primarySkills=updatedPS;
      this.psUpdated.next([...this.primarySkills]);

    })
  }
  addPrimarySkills(ps:PrimarySkills){
    this.http.post<{message:string,psId:string}>(BACKEND_URL,ps)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      ps._id=id;
      this.primarySkills?.push(ps);
      this.psUpdated.next([...this.primarySkills]);
    })
  }
}
