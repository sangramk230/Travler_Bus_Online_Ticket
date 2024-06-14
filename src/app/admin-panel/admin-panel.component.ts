import { Component } from '@angular/core';
import { User } from '../login.service';
import { Admin, AdminService } from '../admin.service';
import { BusService, Checkbus, Ticket, TicketDetails } from '../bus.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  adminTT: Admin[] = [];
  user: User[] = [];
  checkbusAll: Checkbus[] = [];
  ticketDetails: TicketDetails[] = [];
  usert: User = new User(0, '', '', '', '', '', '', '');
  ticketAll: Ticket = new Ticket(0, '', '', '', new Date(), 1, '', 0, 0, '');
  checkbus: Checkbus = new Checkbus(0, '', '', 0, '', '', 0, new Date(), '', '');
  locations: string[] = [
    'Baramati',
    'Phaltan',
    'Satara',
    'Mahableshwar',
    'Mumbai',
    'Pune',
  ];
  showFirstDiv: boolean = false;
  showSecondDiv: boolean = false;
  showThirdDiv: boolean = false;
  showFourthDiv: boolean = false;
  showFiveDiv: boolean = false;
  showSixDiv: boolean = false;
  tt: boolean = true;
  hh: boolean = true;
  currentDate: string = '';

  constructor(
    private adminService: AdminService,
    private busService: BusService
  ) {
    this.toggleViewBus();
    this.setCurrentDate();
  }

  setCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    this.currentDate = today.toLocaleDateString('en-US', options);
  }

  toggleViewBus() {
    this.allBus();
    this.showThirdDiv = false;
    this.showFirstDiv = false;
    this.showSecondDiv = false;
    this.showFourthDiv = false;
    this.showFiveDiv = false;
    this.showSixDiv = false;
    this.tt = true;
  }

  toggleApproval() {
    this.getPendingTickets();
    this.showThirdDiv = true;
    this.showFirstDiv = false;
    this.showSecondDiv = false;
    this.showFourthDiv = false;
    this.showFiveDiv = false;
    this.showSixDiv = false;
    this.tt = false;
  }

  toggleAddBus() {
    this.showFiveDiv = true;
    this.showFourthDiv = false;
    this.showFirstDiv = false;
    this.showSecondDiv = false;
    this.showThirdDiv = false;
    this.showSixDiv = false;
    this.tt = false;
  }

  toggleProfile() {
    this.profile();
    this.showThirdDiv = false;
    this.showFirstDiv = false;
    this.showSecondDiv = false;
    this.showFourthDiv = false;
    this.showFiveDiv = false;
    this.showSixDiv = true;
    this.tt = false;
  }

  addbus() {
    if (!this.checkbus) {
      alert('Please fill all data');
      return;
    }
    this.adminService.addbus(this.checkbus).subscribe(
      (response) => {
        alert('Bus added successfully');
        window.location.reload();
      },
      (error) => {
        console.error('Error while adding bus:', error);
        alert('An error occurred while adding the bus. Please try again later.');
      }
    );
  }

  viewUsers() {
    this.adminService.viewUser().subscribe((data: User[]) => {
      if (data && data.length > 0) {
        this.showFirstDiv = true;
        this.showFourthDiv = false;
        this.showSecondDiv = false;
        this.showThirdDiv = false;
        this.showFiveDiv = false;
        this.showSixDiv = false;
        this.tt = false;
        this.user = data;
      } else {
        alert('No User found');
      }
    });
  }

  adminView(id: number): void {
    this.adminService.adminView(id).subscribe(
      (data: Admin[]) => {
        if (data && data.length > 0) {
          this.showSecondDiv = true;
          this.showThirdDiv = false;
          this.showFirstDiv = false;
          this.showFourthDiv = false;
          this.showFiveDiv = false;
          this.tt = false;
          this.adminTT = data;
          this.ticketDetails[0].ticket.id = this.usert.id;
        } else {
          alert('No user tickets found.');
        }
      },
      (error) => {
        console.error('Error occurred while fetching user tickets:', error);
        alert('Failed to load user tickets. Please try again.');
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
        this.ticketDetails = this.ticketDetails.filter(ticket => ticket.ticket.pid !== pid);
        window.alert('Your ticket has been cancelled successfully!');
      },
      (error) => {
        window.alert('Error canceling ticket. Please try again.');
      }
    );
  }

  checkContactLength() {
    if (this.checkbus.contact.length > 10) {
      this.checkbus.contact = this.checkbus.contact.substring(0, 10);
    }
  }

  getPendingTickets() {
    this.adminService.getPendingTickets().subscribe(
      (data: Admin[]) => {
        this.showSecondDiv = false;
        this.showThirdDiv = true;
        this.showFirstDiv = false;
        this.showFourthDiv = false;
        this.showFiveDiv = false;
        this.tt = false;
        this.adminTT = data;
      },
      (error) => {
        console.error('Error occurred while fetching pending tickets:', error);
      }
    );
  }

  approveTicket(pid: number, phoneno: string) {
    this.adminService.approveTicket(pid, phoneno).subscribe(
      (data) => {
        this.adminTT.forEach(tr => {
          if (tr.ticket.pid === pid) {
            tr.ticket.checkstatus = 'Approved';
          }
        });
        alert('Ticket approved');
      },
      (error) => {
        console.error('Error approving ticket:', error);
        alert('An error occurred while approving the ticket. Please try again later.');
      }
    );
  }

  rejectTicket(pid: number, phoneno: string) {
    this.adminService.rejectTicket(pid, phoneno).subscribe(
      (data) => {
        this.adminTT.forEach(tr => {
          if (tr.ticket.pid === pid) {
            tr.ticket.checkstatus = 'Rejected';
          }
        });
        alert('Ticket rejected');
      },
      (error) => {
        console.error('Error rejecting ticket:', error);
        alert('An error occurred while rejecting the ticket. Please try again later.');
      }
    );
  }

  allBus() {
    this.adminService.allBus().subscribe((data: Checkbus[]) => {
      if (data && data.length > 0) {
        this.tt = true;
        this.checkbusAll = data.filter(checkbus => checkbus.status === 'valid');
        console.log(this.checkbusAll);
      }
    });
  }

  cancelBus(busid: number): void {
    const confirmCancel = window.confirm('Are you sure you want to cancel this bus?');
    if (!confirmCancel) {
      return;
    }
    this.adminService.cancelBus(busid).subscribe(
      () => {
        this.checkbusAll = this.checkbusAll.filter(checkbus => checkbus.busid !== busid);
        window.alert('Bus has been cancelled successfully!');
      },
      (error) => {
        window.alert('Error canceling bus. Please try again.');
      }
    );
  }

  profile() {
    this.adminService.profile().subscribe(
      (data: User[]) => {
        if (data) {
          this.user = data;
        } else {
          alert('No user found. Please login.');
        }
      },
      (error) => {
        console.error('Error occurred while fetching profile:', error);
      }
    );
  }
}
