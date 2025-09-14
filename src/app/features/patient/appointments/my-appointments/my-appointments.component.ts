import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {
  searchQuery = '';
  selectedStatus = 'all';
  selectedDate = '';
  
  appointments = [
    {
      id: 1,
      doctorName: 'د. محمد علي',
      doctorSpecialty: 'أمراض القلب',
      date: '2024-01-20',
      time: '10:00',
      status: 'مؤكد',
      type: 'استشارة',
      notes: 'فحص دوري',
      duration: 30,
      room: 'A101',
      location: 'الطابق الأول - غرفة A101'
    },
    {
      id: 2,
      doctorName: 'د. سارة أحمد',
      doctorSpecialty: 'طب الأطفال',
      date: '2024-01-25',
      time: '14:30',
      status: 'مؤكد',
      type: 'متابعة',
      notes: 'متابعة العلاج',
      duration: 45,
      room: 'A102',
      location: 'الطابق الأول - غرفة A102'
    },
    {
      id: 3,
      doctorName: 'د. أحمد السيد',
      doctorSpecialty: 'الجراحة العامة',
      date: '2024-01-18',
      time: '09:00',
      status: 'مكتمل',
      type: 'استشارة',
      notes: 'شكوى من ألم في البطن',
      duration: 30,
      room: 'A103',
      location: 'الطابق الأول - غرفة A103'
    },
    {
      id: 4,
      doctorName: 'د. فاطمة حسن',
      doctorSpecialty: 'النساء والولادة',
      date: '2024-01-15',
      time: '11:00',
      status: 'ملغي',
      type: 'فحص',
      notes: 'فحص شامل',
      duration: 60,
      room: 'A104',
      location: 'الطابق الأول - غرفة A104'
    }
  ];

  filteredAppointments = [...this.appointments];

  ngOnInit(): void {
    this.filterAppointments();
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesSearch = appointment.doctorName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          appointment.doctorSpecialty.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
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

  cancelAppointment(appointment: any): void {
    if (confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) {
      appointment.status = 'ملغي';
      this.filterAppointments();
    }
  }

  rescheduleAppointment(appointment: any): void {
    console.log('Rescheduling appointment:', appointment);
    // Implement reschedule functionality
  }

  getUpcomingAppointments(): any[] {
    return this.appointments.filter(apt => 
      apt.status === 'مؤكد' && new Date(apt.date) >= new Date()
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getPastAppointments(): any[] {
    return this.appointments.filter(apt => 
      apt.status === 'مكتمل' || new Date(apt.date) < new Date()
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getConfirmedAppointmentsCount(): number {
    return this.appointments.filter(apt => apt.status === 'مؤكد').length;
  }
}