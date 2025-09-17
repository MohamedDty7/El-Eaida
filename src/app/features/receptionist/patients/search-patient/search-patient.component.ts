import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-patient.component.html',
  styleUrl: './search-patient.component.css'
})
export class SearchPatientComponent implements OnInit {
  searchQuery = '';
  searchType = 'name';
  searchResults: any[] = [];
  isLoading = false;

  searchTypes = [
    { value: 'name', label: 'الاسم' },
    { value: 'phone', label: 'رقم الهاتف' },
    { value: 'email', label: 'البريد الإلكتروني' },
    { value: 'id', label: 'رقم المريض' }
  ];

  // Mock data for search results
  allPatients = [
    {
      id: 1,
      name: 'أحمد السيد',
      email: 'ahmed@example.com',
      phone: '01234567890',
      age: 35,
      gender: 'ذكر',
      status: 'نشط',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-20',
      totalVisits: 12
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
      nextAppointment: '2024-01-18',
      totalVisits: 8
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
      nextAppointment: null,
      totalVisits: 3
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchResults = this.allPatients;
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = this.allPatients;
      return;
    }

    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.searchResults = this.allPatients.filter(patient => {
        const query = this.searchQuery.toLowerCase();
        
        switch (this.searchType) {
          case 'name':
            return patient.name.toLowerCase().includes(query);
          case 'phone':
            return patient.phone.includes(query);
          case 'email':
            return patient.email.toLowerCase().includes(query);
          case 'id':
            return patient.id.toString().includes(query);
          default:
            return false;
        }
      });
      
      this.isLoading = false;
    }, 500);
  }

  onClearSearch(): void {
    this.searchQuery = '';
    this.searchResults = this.allPatients;
  }

  viewPatient(patient: any): void {
    console.log('عرض تفاصيل المريض:', patient);
    // يمكن إضافة التنقل إلى صفحة تفاصيل المريض
  }

  editPatient(patient: any): void {
    console.log('تعديل المريض:', patient);
    this.router.navigate(['/receptionist/patients/edit', patient.id]);
  }

  addAppointment(patient: any): void {
    this.router.navigate(['/receptionist/appointments/add'], {
      queryParams: { patientId: patient.id }
    });
  }

  getStatusClass(status: string): string {
    return status === 'نشط' ? 'status-active' : 'status-inactive';
  }

  getGenderIcon(gender: string): string {
    return gender === 'ذكر' ? 'fas fa-male' : 'fas fa-female';
  }
}









