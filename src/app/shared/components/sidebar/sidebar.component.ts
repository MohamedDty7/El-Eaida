import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems = [
    {
      label: 'الرئيسية',
      route: '/home',
      icon: 'fas fa-home',
      badge: null
    },
    {
      label: 'المرضى',
      route: '/patients',
      icon: 'fas fa-users',
      badge: '12'
    },
    {
      label: 'المواعيد',
      route: '/appointments',
      icon: 'fas fa-calendar-alt',
      badge: '5'
    },
    {
      label: 'الأدوية',
      route: '/medications',
      icon: 'fas fa-pills',
      badge: null
    },
    {
      label: 'الأطباء',
      route: '/doctors',
      icon: 'fas fa-user-md',
      badge: null
    },
    {
      label: 'الأقسام',
      route: '/departments',
      icon: 'fas fa-building',
      badge: null
    },
    {
      label: 'التقارير',
      route: '/reports',
      icon: 'fas fa-chart-bar',
      badge: null
    },
    {
      label: 'الإعدادات',
      route: '/settings',
      icon: 'fas fa-cog',
      badge: null
    }
  ];

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}