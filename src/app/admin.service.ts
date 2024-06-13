import { Injectable } from '@angular/core';
import { Checkbus, Ticket } from './bus.service';
import { User } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  viewUser():Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8080/api/admin/viewuser");
  }
  adminView(id:number){
    return this.http.get<any[]>("http://localhost:8080/api/admin/adminview/"+id);
  }
  addbus(bus:Checkbus):Observable<Checkbus> {
    return this.http.post<Checkbus>("http://localhost:8080/api/checkbus/addbus",bus);
  }
  getPendingTickets():Observable<Admin[]> {
    return this.http.get<Admin[]>("http://localhost:8080/api/admin/pendingtickets");
  }
  approveTicket(pid:number,phoneno:string){
    return this.http.put("http://localhost:8080/api/admin/approveticket/"+pid+"/"+phoneno,null);
  }
  rejectTicket(pid:number,phoneno:string){
    return this.http.put("http://localhost:8080/api/admin/rejectticket/"+pid+"/"+phoneno,null);
  }
  allBus(): Observable<Checkbus[]> {
    return this.http.get<Checkbus[]>("http://localhost:8080/api/checkbus/allbus")
  }
  cancelBus(busid:number){
    return this.http.delete(`http://localhost:8080/api/admin/cancelbus/${busid}`)
  }
  profile(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/api/admin/profileAdmin")
  }
}
export class Admin{
  user:User;
  ticket:Ticket;
  checkbus:Checkbus
  constructor(user:User,ticket:Ticket,checkbus:Checkbus) {
    console.log("Constructor of Admin class called");
    console.log("User:",user);
    console.log("Ticket:",ticket);
    console.log("Checkbus:",checkbus);
    this.user=user;
    this.ticket=ticket;
    this.checkbus=checkbus;
  }
}
