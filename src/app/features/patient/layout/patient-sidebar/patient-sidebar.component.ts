import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../../core/services/menu.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-patient-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-sidebar.component.html',
  styleUrl: './patient-sidebar.component.css'
})
export class PatientSidebarComponent {
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
