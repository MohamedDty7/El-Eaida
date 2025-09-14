import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css'
})
export class AppointmentsListComponent implements OnInit {
  searchQuery = '';
  selectedStatus = 'all';
  selectedDate = '';
  
  appointments = [
    {
      id: 1,
      patientName: 'أحمد السيد',
      patientPhone: '01234567890',
      date: '2024-01-20',
      time: '10:00',
      status: 'مؤكد',
      type: 'استشارة',
      notes: 'فحص دوري',
      duration: 30
    },
    {
      id: 2,
      patientName: 'فاطمة حسن',
      patientPhone: '01234567891',
      date: '2024-01-20',
      time: '11:30',
      status: 'مؤكد',
      type: 'متابعة',
      notes: 'متابعة العلاج',
      duration: 45
    },
    {
      id: 3,
      patientName: 'علي محمود',
      patientPhone: '01234567892',
      date: '2024-01-21',
      time: '09:00',
      status: 'في الانتظار',
      type: 'استشارة',
      notes: 'شكوى من ألم في الصدر',
      duration: 30
    },
    {
      id: 4,
      patientName: 'سارة أحمد',
      patientPhone: '01234567893',
      date: '2024-01-21',
      time: '14:00',
      status: 'ملغي',
      type: 'فحص',
      notes: 'فحص شامل',
      duration: 60
    }
  ];

  filteredAppointments = [...this.appointments];

  ngOnInit(): void {
    this.filterAppointments();
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          appointment.patientPhone.includes(this.searchQuery) ||
                          appointment.notes.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'all' || appointment.status === this.selectedStatus;
      const matchesDate = !this.selectedDate || appointment.date === this.selectedDate;
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  onSearchChange(): void {
    this.filterAppointments();
  }

  onStatusChange(): void {
    this.filterAppointments();
  }

  onDateChange(): void {
    this.filterAppointments();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'مؤكد':
        return 'status-confirmed';
      case 'في الانتظار':
        return 'status-pending';
      case 'ملغي':
        return 'status-cancelled';
      case 'مكتمل':
        return 'status-completed';
      default:
        return 'status-unknown';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'استشارة':
        return 'type-consultation';
      case 'متابعة':
        return 'type-followup';
      case 'فحص':
        return 'type-examination';
      default:
        return 'type-other';
    }
  }

  confirmAppointment(appointment: any): void {
    appointment.status = 'مؤكد';
    this.filterAppointments();
  }

  cancelAppointment(appointment: any): void {
    appointment.status = 'ملغي';
    this.filterAppointments();
  }

  completeAppointment(appointment: any): void {
    appointment.status = 'مكتمل';
    this.filterAppointments();
  }
}