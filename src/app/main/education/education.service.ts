import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Education } from "./education.model";

const BACKEND_URL=environment.apiUrl+"/education/";

@Injectable({providedIn:'root'})
export class EducationService{
  private educationUpdated=new Subject<Education[]>();
  education:Education[]=[];
  constructor(private http:HttpClient){}
  getEducation(userId:string){
    return this.http.get<Education[]>(BACKEND_URL+userId)
    .pipe(map((data)=>{
      return data.map(e=>{
        return {
          _id:e._id,
          name:e.name,
          desc:e.desc,
          startDate:e.startDate,
          endDate:e.endDate,
          userID:e.userID
        }
      })
    }))
  }
  getEducationUpdateListener(){
    return this.educationUpdated.asObservable();
  }
  addEducation(education:Education){
    this.http.post<{message:string,psId:string}>(BACKEND_URL,education)
    .subscribe((responseData)=>{
      const id=responseData.psId;
      education._id=id;
      this.education?.push(education);
      this.educationUpdated.next([...this.education]);
    })
  }
  delete(id:string){
    this.http.delete(BACKEND_URL+id)
    .subscribe(()=>{
      const updatedPS=this.education.filter(ps=>ps._id!==id);
      this.education=updatedPS;
      this.educationUpdated.next([...this.education]);

    })
  }
}
