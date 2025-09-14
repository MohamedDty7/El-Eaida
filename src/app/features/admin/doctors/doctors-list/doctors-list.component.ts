import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css'
})
export class DoctorsListComponent implements OnInit {
  searchQuery = '';
  selectedSpecialty = 'all';
  selectedStatus = 'all';
  
  doctors = [
    {
      id: 1,
      name: 'د. محمد علي',
      email: 'mohamed.ali@example.com',
      phone: '01234567890',
      specialty: 'أمراض القلب',
      experience: 15,
      status: 'نشط',
      patientsCount: 45,
      rating: 4.8,
      schedule: '9:00 ص - 5:00 م',
      avatar: null
    },
    {
      id: 2,
      name: 'د. سارة أحمد',
      email: 'sara.ahmed@example.com',
      phone: '01234567891',
      specialty: 'طب الأطفال',
      experience: 12,
      status: 'نشط',
      patientsCount: 38,
      rating: 4.9,
      schedule: '8:00 ص - 4:00 م',
      avatar: null
    },
    {
      id: 3,
      name: 'د. أحمد السيد',
      email: 'ahmed.sayed@example.com',
      phone: '01234567892',
      specialty: 'الجراحة العامة',
      experience: 20,
      status: 'غير نشط',
      patientsCount: 0,
      rating: 4.7,
      schedule: '10:00 ص - 6:00 م',
      avatar: null
    }
  ];

  specialties = [
    'أمراض القلب',
    'طب الأطفال',
    'الجراحة العامة',
    'طب العيون',
    'طب الأسنان',
    'النساء والولادة',
    'الطب الباطني',
    'الطب النفسي'
  ];

  filteredDoctors = [...this.doctors];

  ngOnInit(): void {
    this.filterDoctors();
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          doctor.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesSpecialty = this.selectedSpecialty === 'all' || doctor.specialty === this.selectedSpecialty;
      const matchesStatus = this.selectedStatus === 'all' || doctor.status === this.selectedStatus;
      
      return matchesSearch && matchesSpecialty && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterDoctors();
  }

  onSpecialtyChange(): void {
    this.filterDoctors();
  }

  onStatusChange(): void {
    this.filterDoctors();
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

  getRatingStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    
    if (hasHalfStar) {
      stars.push('half');
    }
    
    while (stars.length < 5) {
      stars.push('empty');
    }
    
    return stars;
  }
}