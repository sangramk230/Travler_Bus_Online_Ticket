import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  signup(user:User) {
    return this.http.post<void>("http://localhost:8080/api/user/signup",user); 
  }
  loginUser(email: string, password: string){
    return this.http.get<Boolean>(`http://localhost:8080/api/user/login/${email}/${password}`); 
  }
  adminLogin(email: string, password: string){
    return this.http.get<Boolean>(`http://localhost:8080/api/admin/adminlogin/${email}/${password}`);
  }
}
export class User{
    id:number
    name:string;
	  gender:string ;
	  dob: string;
	  email: string ;
	  phoneno:string;
    password: string;
    confirmPassword: string;
   constructor( id:number,name:string,gender:string,dob:string,email:string,phoneno:string,password: string,confirmPassword: string) {
      this.id = id;  
      this.name=name;
      this.gender=gender;
      this.dob=dob;
      this.email=email;
      this.phoneno=phoneno;
      this.password = password;
      this.confirmPassword = confirmPassword;

    }
}
