import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Work } from "./work.model";

const BACKEND_URL=environment.apiUrl+"/project/";

@Injectable({providedIn:'root'})
export class WorkService{
  private projectUpdated=new Subject<Work[]>();
  project:Work[]=[];
  constructor(private http:HttpClient){}
  getProject(userId:string){
    return this.http.get<Work[]>(BACKEND_URL+userId)
    .pipe(map((data)=>{
      return data.map(e=>{
        return {
          _id:e._id,
          title:e.title,
          link:e.link,
          userID:e.userID
        }
      })
    }))
  }
  getProjectUpdateListener(){
    return this.projectUpdated.asObservable();
  }
  addProject(project:Work){
    this.http.post<{message:string,psId:string}>(BACKEND_URL,project)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      project._id=id;
      this.project?.push(project);
      this.projectUpdated.next([...this.project]);
    })
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{
      const updatedPS=this.project.filter(ps=>ps._id!==id);
      this.project=updatedPS;
      this.projectUpdated.next([...this.project]);

    })
  }
}
