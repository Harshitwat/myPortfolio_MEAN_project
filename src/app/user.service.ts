import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Contact } from "./main/contact/contact.model";
import { ContactService } from "./main/contact/contact.service";
import { Education } from "./main/education/education.model";
import { EducationService } from "./main/education/education.service";
import { Experience } from "./main/experience/experience.model";
import { ExperienceService } from "./main/experience/experience.service";
import { Expertise } from "./main/expertise/expertise.model";
import { ExpertiseService } from "./main/expertise/expertise.service";
import { Skill } from "./main/skills/skill.model";
import { SkillService } from "./main/skills/skill.service";
import { Work } from "./main/work/work.model";
import { WorkService } from "./main/work/work.service";
import { PrimarySkills } from "./primarySkills.model";
import { PrimarySkillsService } from "./primarySkills.service";
import { User } from "./user.model";

const BACKEND_URL=environment.apiUrl+"/users/";

@Injectable({providedIn:'root'})
export class UserService{
  private users:User[]=[];
  private usersUpdated=new Subject<User[]>();
  private user:User;
  constructor(
    private http:HttpClient,
    private primarySkillsService:PrimarySkillsService,
    private expertiseService:ExpertiseService,
    private skillsService:SkillService,
    private educationsService:EducationService,
    private experienceService:ExperienceService,
    private projectService:WorkService,
    private contactService:ContactService
    ){}

  getUser(id:string){
    return this.http.get<{
      _id:string,
      firstName:string,
      lastName:string,
      designation:string,
      location:string,
      about:string,
      pImage:string,
      cImage:string,
      creator:string,
      cvLink:string
    }>(BACKEND_URL+id)
  }
  getUsers(){
    this.http.get<{message:string,users:any}>(BACKEND_URL)
    .pipe(map((userData)=>{
      return userData.users.map(user=>{
        return {
          userID:user._id,
          firstName:user.firstName,
          lastName:user.lastName,
          designation:user.designation,
          location:user.location,
          about:user.about,
          pImage:user.pImage,
          cImage:user.cImage,
          creator:user.creator
        }
      })
    }))
    .subscribe((transformedUsers)=>{
      this.users=transformedUsers;
      this.usersUpdated.next([...this.users]);

    })
  }
  getUsersUpdateListener(){
    return this.usersUpdated.asObservable();
  }
  updateUser(user:User,profileImage:File | string,coverImage:File | string){
    let userData
      userData=new FormData();
      userData.append('userID',user.userID);
      userData.append('firstName',user.firstName);
    userData.append('lastName',user.lastName);
    userData.append('designation',user.designation);
    userData.append('location',user.location);
    userData.append('about',user.about);
    userData.append('cvLink',user.cvLink);
    if(typeof(profileImage)==='object')
    userData.append('pImage',profileImage,user.firstName);
    else{
      userData.append('pImage',profileImage)
    }

    if(typeof(coverImage)==='object')
    userData.append('pImage',coverImage,user.firstName);
    else{
      userData.append('cImage',coverImage)
    }
    this.http.put(BACKEND_URL+user.userID,userData)
    .subscribe(response=>{
      const updatedUsers=[...this.users];
      const oldUserIndex=updatedUsers.findIndex(u=>u.userID===user.userID);
      const newUser:User={
        userID:user.userID,
        firstName:user.firstName,
        lastName:user.lastName,
        designation:user.designation,
        location:user.location,
        about:user.about,
        pImage:"response.pImage",
        cImage:"response.cImage",
        creator:null,
        cvLink:user.cvLink
      }
      updatedUsers[oldUserIndex]=newUser;
      this.users=updatedUsers;
      this.usersUpdated.next([...this.users]);
    })
  }

  addUser(
    user:User,
    primarySkills:PrimarySkills[],
    pImage:File,
    cImage:File,
    expertise:Expertise[],
    skills:Skill[],
    educations:Education[],
    experience:Experience[],
    project:Work[],
    contact:Contact
    ){

    const userData=new FormData();
    userData.append('firstName',!user.firstName?"blank":user.firstName);
    userData.append('lastName',!user.lastName?"blank":user.lastName);
    userData.append('cvLink',!user.cvLink?"blank":user.cvLink);
    userData.append('designation',!user.designation?"blank":user.designation);
    userData.append('location',!user.location?"blank":user.location);
    userData.append('about',!user.about?"blank":user.about);
    userData.append('pImage',pImage,!user.firstName?"blank":user.firstName);
    userData.append('pImage',cImage,!user.firstName?"blank":user.firstName);
    this.http.post<{message:string,user:User}>(BACKEND_URL,userData)
    .subscribe((responseData)=>{
      user.userID=responseData.user.userID;
      user.pImage=responseData.user.pImage;
      user.cImage=responseData.user.cImage;
      for (let index = 0; index < primarySkills.length; index++) {

          primarySkills[index].userID=user.userID;
          this.primarySkillsService.addPrimarySkills(primarySkills[index]);
      }
      for (let index = 0; index < expertise.length; index++) {
        expertise[index].userID=user.userID;
        this.expertiseService.addExpertise(expertise[index]);

      }
      for (let index = 0; index < skills.length; index++) {
        skills[index].userID=user.userID;
        this.skillsService.addSkill(skills[index]);

      }
      for (let index = 0; index < educations.length; index++) {
        educations[index].userID=user.userID;
        this.educationsService.addEducation(educations[index]);

      }
      for (let index = 0; index < experience.length; index++) {
        experience[index].userID=user.userID;
        this.experienceService.addExperience(experience[index]);

      }
      for (let index = 0; index < project.length; index++) {
        project[index].userID=user.userID;
        this.projectService.addProject(project[index]);

      }
      contact.userID=user.userID;
      this.contactService.addContact(contact);
      this.users?.push(user);
    })
  }
  deleteUser(userId:string){
    this.http.delete(BACKEND_URL+userId)
    .subscribe(()=>{
      this.skillsService.getSkills(userId).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.skillsService.delete(data[i]._id);
        }
      })
      this.primarySkillsService.getPrimarySkills(userId).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.primarySkillsService.delete(data[i]._id);
        }
      })
      this.experienceService.getExperience(userId).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.experienceService.delete(data[i]._id);
        }
      })
      this.educationsService.getEducation(userId).subscribe(data=>{
        for (let i = 0; i < data.length; i++) {
          this.educationsService.delete(data[i]._id);
        }
      })
      this.expertiseService.getExpertise(userId).subscribe(data=>{
      for (let i = 0; i < data.length; i++) {
        this.expertiseService.delete(data[i]._id);
      }
      })
      this.projectService.getProject(userId).subscribe(data=>{
    for (let i = 0; i < data.length; i++) {
      this.projectService.delete(data[i]._id);
    }
      })
      this.contactService.getContact(userId).subscribe(data=>{
        this.contactService.delete(data[0]._id);
      })

      const updatedUsers=this.users.filter(user=>user.userID!==userId);
      this.users=updatedUsers;
      this.usersUpdated.next([...this.users]);
    })

  }

}
