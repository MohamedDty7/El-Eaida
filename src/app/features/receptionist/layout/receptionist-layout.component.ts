import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReceptionistSidebarComponent } from './receptionist-sidebar/receptionist-sidebar.component';
import { ReceptionistNavbarComponent } from './receptionist-navbar/receptionist-navbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { MenuService, MenuItem } from '../../../core/services/menu.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-receptionist-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReceptionistSidebarComponent, ReceptionistNavbarComponent],
  templateUrl: './receptionist-layout.component.html',
  styleUrl: './receptionist-layout.component.css'
})
export class ReceptionistLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  receptionistMenuItems: MenuItem[] = [];
  currentUser: User | null = null;

  constructor(private authService: AuthService, private menuService: MenuService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.receptionistMenuItems = this.menuService.getMenuItemsByRole(user.role);
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
