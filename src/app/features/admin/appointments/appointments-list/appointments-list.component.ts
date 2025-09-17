import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  statusText: string;
  type: string;
}

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockData();
    this.filterAppointments();
  }

  private loadMockData(): void {
    this.appointments = [
      {
        id: '1',
        patientName: 'أحمد السيد',
        doctorName: 'د. سارة أحمد',
        date: new Date('2024-01-15'),
        time: '10:00',
        status: 'scheduled',
        statusText: 'مجدول',
        type: 'فحص دوري'
      },
      {
        id: '2',
        patientName: 'فاطمة حسن',
        doctorName: 'د. محمد علي',
        date: new Date('2024-01-15'),
        time: '11:30',
        status: 'confirmed',
        statusText: 'مؤكد',
        type: 'استشارة'
      },
      {
        id: '3',
        patientName: 'علي محمود',
        doctorName: 'د. سارة أحمد',
        date: new Date('2024-01-15'),
        time: '14:00',
        status: 'completed',
        statusText: 'مكتمل',
        type: 'متابعة'
      }
    ];
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const searchLower = this.searchTerm.toLowerCase();
      return appointment.patientName.toLowerCase().includes(searchLower) ||
             appointment.doctorName.toLowerCase().includes(searchLower) ||
             appointment.type.toLowerCase().includes(searchLower);
    });
    
    this.totalPages = Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this.filterAppointments();
  }

  viewAppointment(appointment: Appointment): void {
    console.log('View appointment:', appointment);
  }

  editAppointment(appointment: Appointment): void {
    this.router.navigate(['/admin/appointments/edit', appointment.id]);
  }

  cancelAppointment(appointment: Appointment): void {
    console.log('Cancel appointment:', appointment);
  }

  addNewAppointment(): void {
    this.router.navigate(['/admin/appointments/add']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get paginatedAppointments(): Appointment[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAppointments.slice(startIndex, endIndex);
  }
}

