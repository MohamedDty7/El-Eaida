import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PatientSidebarComponent } from './patient-sidebar/patient-sidebar.component';
import { PatientNavbarComponent } from './patient-navbar/patient-navbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { MenuService, MenuItem } from '../../../core/services/menu.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-patient-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PatientSidebarComponent, PatientNavbarComponent],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  patientMenuItems: MenuItem[] = [];
  currentUser: User | null = null;

  constructor(private authService: AuthService, private menuService: MenuService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.patientMenuItems = this.menuService.getMenuItemsByRole(user.role);
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
