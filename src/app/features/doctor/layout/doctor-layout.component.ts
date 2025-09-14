import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { MenuService } from '../../../core/services/menu.service';
import { User, MenuItem } from '../../../core/models/user.model';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
import { DoctorNavbarComponent } from './doctor-navbar/doctor-navbar.component';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, DoctorSidebarComponent, DoctorNavbarComponent],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.css'
})
export class DoctorLayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  menuItems: MenuItem[] = [];
  sidebarCollapsed = false;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // Subscribe to current user
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadMenuItems();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadMenuItems(): void {
    this.subscriptions.push(
      this.menuService.getMenuItems().subscribe(items => {
        this.menuItems = items;
      })
    );
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
