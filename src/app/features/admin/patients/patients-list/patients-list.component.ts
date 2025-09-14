import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css'
})
export class PatientsListComponent implements OnInit {
  searchQuery = '';
  selectedStatus = 'all';
  
  patients = [
    {
      id: 1,
      name: 'أحمد السيد',
      email: 'ahmed@example.com',
      phone: '01234567890',
      age: 35,
      gender: 'ذكر',
      status: 'نشط',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-20'
    },
    {
      id: 2,
      name: 'فاطمة حسن',
      email: 'fatima@example.com',
      phone: '01234567891',
      age: 28,
      gender: 'أنثى',
      status: 'نشط',
      lastVisit: '2024-01-14',
      nextAppointment: '2024-01-18'
    },
    {
      id: 3,
      name: 'علي محمود',
      email: 'ali@example.com',
      phone: '01234567892',
      age: 42,
      gender: 'ذكر',
      status: 'غير نشط',
      lastVisit: '2023-12-20',
      nextAppointment: null
    }
  ];

  filteredPatients = [...this.patients];

  ngOnInit(): void {
    this.filterPatients();
  }

  filterPatients(): void {
    this.filteredPatients = this.patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          patient.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          patient.phone.includes(this.searchQuery);
      
      const matchesStatus = this.selectedStatus === 'all' || patient.status === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterPatients();
  }

  onStatusChange(): void {
    this.filterPatients();
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
}
