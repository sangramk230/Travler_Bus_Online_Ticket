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
    return this.http.get<any[]>("https://sparkling-truth-production.up.railway.app/api/admin/viewuser");
  }
  adminView(id:number){
    return this.http.get<any[]>("https://sparkling-truth-production.up.railway.app/api/admin/adminview/"+id);
  }
  addbus(bus:Checkbus):Observable<Checkbus> {
    return this.http.post<Checkbus>("https://sparkling-truth-production.up.railway.app/api/checkbus/addbus",bus);
  }
  getPendingTickets():Observable<Admin[]> {
    return this.http.get<Admin[]>("https://sparkling-truth-production.up.railway.app/api/admin/pendingtickets");
  }
  approveTicket(pid:number,phoneno:string){
    return this.http.put("https://sparkling-truth-production.up.railway.app/api/admin/approveticket/"+pid+"/"+phoneno,null);
  }
  rejectTicket(pid:number,phoneno:string){
    return this.http.put("https://sparkling-truth-production.up.railway.app/api/admin/rejectticket/"+pid+"/"+phoneno,null);
  }
  allBus(): Observable<Checkbus[]> {
    return this.http.get<Checkbus[]>("https://sparkling-truth-production.up.railway.app/api/checkbus/allbus")
  }
  cancelBus(busid:number){
    return this.http.delete(`https://sparkling-truth-production.up.railway.app/api/admin/cancelbus/${busid}`)
  }
  profile(): Observable<User[]> {
    return this.http.get<User[]>("https://sparkling-truth-production.up.railway.app/api/admin/profileAdmin")
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
