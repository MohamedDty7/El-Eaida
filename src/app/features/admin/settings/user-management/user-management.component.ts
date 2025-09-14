import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  searchQuery = '';
  selectedRole = 'all';
  selectedStatus = 'all';
  
  users = [
    {
      id: 1,
      name: 'أحمد السيد',
      email: 'ahmed@example.com',
      role: 'admin',
      roleLabel: 'مدير',
      status: 'نشط',
      lastLogin: '2024-01-15 10:30',
      createdAt: '2023-01-15',
      avatar: null
    },
    {
      id: 2,
      name: 'د. محمد علي',
      email: 'mohamed@example.com',
      role: 'doctor',
      roleLabel: 'طبيب',
      status: 'نشط',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2023-02-20',
      avatar: null
    },
    {
      id: 3,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      role: 'receptionist',
      roleLabel: 'موظف استقبال',
      status: 'نشط',
      lastLogin: '2024-01-14 16:45',
      createdAt: '2023-03-10',
      avatar: null
    },
    {
      id: 4,
      name: 'فاطمة حسن',
      email: 'fatima@example.com',
      role: 'patient',
      roleLabel: 'مريض',
      status: 'غير نشط',
      lastLogin: '2023-12-20 14:20',
      createdAt: '2023-04-05',
      avatar: null
    }
  ];

  roles = [
    { value: 'admin', label: 'مدير' },
    { value: 'doctor', label: 'طبيب' },
    { value: 'receptionist', label: 'موظف استقبال' },
    { value: 'patient', label: 'مريض' }
  ];

  filteredUsers = [...this.users];

  ngOnInit(): void {
    this.filterUsers();
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesRole = this.selectedRole === 'all' || user.role === this.selectedRole;
      const matchesStatus = this.selectedStatus === 'all' || user.status === this.selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterUsers();
  }

  onRoleChange(): void {
    this.filterUsers();
  }

  onStatusChange(): void {
    this.filterUsers();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'نشط':
        return 'status-active';
      case 'غير نشط':
        return 'status-inactive';
      default:
        return 'status-pending';
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'admin':
        return 'role-admin';
      case 'doctor':
        return 'role-doctor';
      case 'receptionist':
        return 'role-receptionist';
      case 'patient':
        return 'role-patient';
      default:
        return 'role-default';
    }
  }

  toggleUserStatus(user: any): void {
    user.status = user.status === 'نشط' ? 'غير نشط' : 'نشط';
    this.filterUsers();
  }

  deleteUser(user: any): void {
    if (confirm(`هل أنت متأكد من حذف المستخدم ${user.name}؟`)) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.users.splice(index, 1);
        this.filterUsers();
      }
    }
  }
}