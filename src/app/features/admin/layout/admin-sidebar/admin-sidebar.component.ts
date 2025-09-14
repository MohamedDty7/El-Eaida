import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User, MenuItem } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  @Input() isCollapsed = false;
  @Input() menuItems: MenuItem[] = [];
  @Input() currentUser: User | null = null;
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
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
