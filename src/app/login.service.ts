import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  signup(user:User) {
    return this.http.post<void>("https://sparkling-truth-production.up.railway.app/api/user/signup",user); 
  }
  loginUser(email: string, password: string){
    return this.http.get<Boolean>(`https://sparkling-truth-production.up.railway.app/api/user/login/${email}/${password}`); 
  }
  adminLogin(email: string, password: string){
    return this.http.get<Boolean>(`https://sparkling-truth-production.up.railway.app/api/admin/adminlogin/${email}/${password}`);
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
