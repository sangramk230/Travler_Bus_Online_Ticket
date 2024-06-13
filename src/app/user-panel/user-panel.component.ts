import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { BusService, Checkbus, Ticket, TicketDetails } from '../bus.service';
import { User } from '../login.service';
import { Location } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-user-panel',
  standalone: false,
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})
export class UserPanelComponent {
  ticketAll: Ticket = new Ticket(0, '', '', '', new Date(), 1, '', 0, 0, '');
  checkbus: Checkbus = new Checkbus(0, '', '', 0, '', '', 0, new Date(), '', '');
  user: User = new User(0, '', '', '', '', '', '', '');
  locations: string[] = ['Baramati', 'Phaltan', 'Satara', 'Mahableshwar', 'Mumbai', 'Pune'];
  uy: User[] = [];
  checkbusAll: Checkbus[] = [];
  tt: TicketDetails[] = [];
  selectedTicketDetail: any;
  showFirstDiv: boolean = false;
  showSecondDiv: boolean = false;
  showThirdDiv: boolean = true;
  showFourthDiv: boolean = false;
  showFiveDiv: boolean = false;
  showSixDiv: boolean = false;
  ch: boolean = true;
  currentDate: string = '';

  constructor(private busService: BusService, private router: Router,private loc: Location) {
    this.allBus();
    this.setCurrentDate();
  }

  cancel() {
    
 window.location.reload();
    
  } 
  setCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    this.currentDate = today.toLocaleDateString('en-US', options);
  }

  toggleview() {
    this.viewTicket();
    this.showThirdDiv = false;
    this.showFirstDiv = true;
    this.showSecondDiv = false;
    this.showFourthDiv = false;
    this.showFiveDiv = false;
    this.showSixDiv = false;
  }

  toggleAddTicket() {
    this.allBus();
    this.showThirdDiv = true;
    this.showFirstDiv = false;
    this.showSecondDiv = true;
    this.showFourthDiv = false;
    this.showFiveDiv = false;
    this.showSixDiv = false;
  }

  toggleProfile() {
    this.profile();
    this.showThirdDiv = false;
    this.showFirstDiv = false;
    this.showSecondDiv = false;
    this.showFourthDiv = false;
    this.showFiveDiv = false;
    this.showSixDiv = true;
  }

  viewTicket() {
    this.busService.viewTicket().subscribe(
      (data: TicketDetails[]) => {
        this.tt = data;
      },
      (error) => {
        console.error('Error occurred while fetching ticket:', error);
      }
    );
  }

  cancelTicket(pid: number): void {
    const confirmCancel = window.confirm('Are you sure you want to cancel this ticket?');
    if (!confirmCancel) {
      return;
    }
    this.busService.cancelTicket(pid).subscribe(
      () => {
        this.tt = this.tt.filter((ticket) => ticket.ticket.pid !== pid);
        window.alert('Your ticket has been cancelled successfully!');
      },
      (error) => {
        window.alert('Error canceling ticket. Please try again.');
      }
    );
  }

  ticket(): void {
    this.busService.pass(this.ticketAll).subscribe((response) => {
      if (response) {
        alert('Ticket booked successfully');
        this.router.navigateByUrl('userpanel');
      } else {
        alert('Error of Buy Ticket.');
      }
    });
  }

  createTicketTranscation(price: number) {
    this.busService.createTicketTranscation(price).subscribe((response: any) => {
      this.openTranscation(response);
    });
  }

  openTranscation(response: any) {
    var options = {
      payment: response.paymentid,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Sangram',
      email: '1O3Zg@example.com',
      phone: '1234567890',
      description: 'Test Transaction',
      handler: (response: any) => {
        if (response != null) {
          this.ticket();
        } else {
          alert('Payment failed');
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#ff73004f',
      },
    };
    var razorpayobj = new Razorpay(options);
    razorpayobj.open();
  }

  checkSeat(firstlocation: string, lastlocation: string, bustype: string) {
    this.busService.check(firstlocation, lastlocation, bustype).subscribe(
      (data: Checkbus[]) => {
        if (data && data.length > 0) {
          const validBuses = data.filter(
            (bus) => bus.status === 'Valid' && bus.avilableseat > 0
          );
          if (validBuses.length > 0) {
            this.showThirdDiv = true;
            this.checkbus = validBuses[0];
            this.ticketAll.firstlocation = this.checkbus.firstlocation;
            this.ticketAll.lastlocation = this.checkbus.lastlocation;
            this.ticketAll.price = this.checkbus.price;
            this.ticketAll.date = this.checkbus.date;
            this.ch = false;
          } else {
            this.showSecondDiv = false;
            this.toggleAddTicket();
            alert('No available bus for the selected route and date.');
          }
        } else {
          this.toggleAddTicket();
          this.showSecondDiv = false;
          alert('No buses found for the selected route and date.');
        }
      },
      (error) => {
        console.error('Error occurred while checking available buses:', error);
      }
    );
  }

  updatePrice() {
    this.ticketAll.price = this.ticketAll.addseat * this.checkbus.price;
    this.ticketAll.price = Math.max(this.ticketAll.price, 0);
  }

  allBus() {
    this.busService.allBus().subscribe((data: Checkbus[]) => {
      if (data && data.length > 0 && data[0].status !== 'Invalid') {
        this.showSecondDiv = true;
        this.ticketAll.bustype = data[0].bustype;
        this.checkbusAll = data;
      } else {
        alert('No buses found.');
      }
    });
  }

  profile() {
    this.busService.profile().subscribe((data: User[]) => {
      if (data) {
        this.uy = data;
      } else {
        alert('No user found. Please login.');
        this.router.navigateByUrl('login');
      }
    });
  }
}
