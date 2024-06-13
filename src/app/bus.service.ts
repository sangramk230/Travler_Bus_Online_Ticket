import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http:HttpClient) { }
  pass(ticket:Ticket ){
    return this.http.post("http://localhost:8080/api/ticket/add",ticket);

  }
  cancelTicket(pid:number){
    return this.http.delete(`http://localhost:8080/api/ticket/cancel/${pid}`);
  }
  viewTicket(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/ticket/view");
  }
  viewTicketByPid(pid:number): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/ticket/viewtpid/"+pid);
  }
  check(from: string, to: string,bustype:string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/checkbus/check/${from}/${to}/${bustype}`);
  }
  createTicketTranscation(amount:number) {
    return this.http.get("http://localhost:8080/api/payment/createTicket/"+amount)
  }
  allBus(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/checkbus/allbus")
  }
  profile(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/user/profileUser")
  }
}
export class Checkbus {
  busid:number;
  firstlocation:string;
  lastlocation:string;
  avilableseat:number;
  contact:string;
  busno:string;
  price:number;
  date:Date=new Date();
  status:string;
  bustype: string;
 
    constructor(busid:number,firstlocation:string,lastlocation:string,avilableseat:number,contact:string,busno:string,price:number,date:Date,status:string,bustype: string) {
      this.busid=busid;
      this.firstlocation=firstlocation;
      this.lastlocation=lastlocation;
      this.avilableseat=avilableseat;
      this.contact=contact;
      this.busno=busno;
      this.price=price;
      this.date = date;
      this.status=status;
      this.bustype=bustype;

    }

  }
  export class Ticket {
    pid:number;
    firstlocation: string;
    lastlocation: string;
    bustype: string;
    date: Date=new Date();
    addseat:number;
    status:string;
    price:number;
    id:number;
    checkstatus:string;
  
    constructor(pid:number, firstlocation:string,lastlocation:string,bustype:string,date:Date,addseat:number,status:string,price:number,id:number,checkstatus:string) {
      this.pid = pid;
      this.firstlocation=firstlocation;
      this.lastlocation=lastlocation;
      this.bustype=bustype;
      this.date=date;
      this.addseat=addseat;
      this.status=status;
      this.price=price;
      this.id=id;
      this.checkstatus=checkstatus;
  
    }
  }

    export class TicketDetails{
      ticket:Ticket;
     checkbus:Checkbus;
     
     constructor(ticket:Ticket,checkbus:Checkbus) {
       this.ticket=ticket;
       this.checkbus=checkbus;
      
      } 
  
    }