import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-medications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-medications.component.html',
  styleUrl: './my-medications.component.css'
})
export class MyMedicationsComponent implements OnInit {
  searchQuery = '';
  selectedStatus = 'all';
  
  myMedications = [
    {
      id: 1,
      name: 'باراسيتامول',
      dosage: '500mg',
      frequency: '3 مرات يومياً',
      duration: '7 أيام',
      status: 'نشط',
      prescribedBy: 'د. محمد علي',
      prescribedDate: '2024-01-15',
      instructions: 'يؤخذ بعد الأكل',
      sideEffects: 'قد يسبب نعاس خفيف',
      remainingDays: 3,
      progress: 57
    },
    {
      id: 2,
      name: 'أموكسيسيلين',
      dosage: '250mg',
      frequency: 'مرتين يومياً',
      duration: '10 أيام',
      status: 'نشط',
      prescribedBy: 'د. سارة أحمد',
      prescribedDate: '2024-01-10',
      instructions: 'يؤخذ مع الطعام',
      sideEffects: 'قد يسبب اضطراب في المعدة',
      remainingDays: 1,
      progress: 90
    },
    {
      id: 3,
      name: 'فيتامين د',
      dosage: '1000 IU',
      frequency: 'مرة يومياً',
      duration: '30 يوم',
      status: 'مكتمل',
      prescribedBy: 'د. أحمد السيد',
      prescribedDate: '2023-12-01',
      instructions: 'يؤخذ مع وجبة الإفطار',
      sideEffects: 'لا توجد آثار جانبية',
      remainingDays: 0,
      progress: 100
    },
    {
      id: 4,
      name: 'أوميبرازول',
      dosage: '20mg',
      frequency: 'مرة يومياً',
      duration: '14 يوم',
      status: 'متوقف',
      prescribedBy: 'د. فاطمة حسن',
      prescribedDate: '2024-01-05',
      instructions: 'يؤخذ قبل الإفطار',
      sideEffects: 'قد يسبب صداع خفيف',
      remainingDays: 0,
      progress: 0
    }
  ];

  filteredMedications = [...this.myMedications];

  ngOnInit(): void {
    this.filterMedications();
  }

  filterMedications(): void {
    this.filteredMedications = this.myMedications.filter(medication => {
      const matchesSearch = medication.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          medication.prescribedBy.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          medication.instructions.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'all' || medication.status === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterMedications();
  }

  onStatusChange(): void {
    this.filterMedications();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'نشط':
        return 'status-active';
      case 'مكتمل':
        return 'status-completed';
      case 'متوقف':
        return 'status-stopped';
      default:
        return 'status-unknown';
    }
  }

  getActiveMedicationsCount(): number {
    return this.myMedications.filter(m => m.status === 'نشط').length;
  }

  getCompletedMedicationsCount(): number {
    return this.myMedications.filter(m => m.status === 'مكتمل').length;
  }

  getProgressPercentage(medication: any): number {
    return medication.progress || 0;
  }

  getRemainingDays(medication: any): number {
    return medication.remainingDays || 0;
  }

  stopMedication(medication: any): void {
    if (confirm('هل أنت متأكد من إيقاف هذا الدواء؟')) {
      medication.status = 'متوقف';
      this.filterMedications();
    }
  }

  restartMedication(medication: any): void {
    medication.status = 'نشط';
    this.filterMedications();
  }

  getUpcomingMedications(): any[] {
    return this.myMedications.filter(med => 
      med.status === 'نشط' && med.remainingDays <= 3
    ).sort((a, b) => a.remainingDays - b.remainingDays);
  }
}