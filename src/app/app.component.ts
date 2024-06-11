import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, FormsModule]
})
export class AppComponent  {
 
}

