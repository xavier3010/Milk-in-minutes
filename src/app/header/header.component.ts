import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  searchTerm: string = '';
  username: string | undefined;
  isLoggedIn: boolean = false;
  


  @Output() searchEvent = new EventEmitter<string>();

  constructor(private sharedService: SharedService) { }

  onSearch() {
    this.searchEvent.emit(this.searchTerm);
  }
  ngOnInit(): void {
    // Retrieve the username from the SharedService
    this.username = this.sharedService.getUsername();
    this.isLoggedIn = !!this.username;
  }
  signOut(): void {
    // Implement sign-out logic here
    // For example, clear the username from the SharedService and navigate to the sign-in page
    this.sharedService.setUsername('');
    localStorage.removeItem('credentials');
    this.isLoggedIn = false;
  }
}
