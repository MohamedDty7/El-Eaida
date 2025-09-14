import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  @Input() currentUser: User | null = null;
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  searchQuery = '';
  showNotifications = false;
  showProfile = false;
  unreadCount = 5;

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showProfile = false;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
    this.showNotifications = false;
  }

  getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'admin': 'مدير النظام',
      'doctor': 'طبيب',
      'receptionist': 'موظف استقبال',
      'patient': 'مريض'
    };
    return roleLabels[role] || role;
  }
}