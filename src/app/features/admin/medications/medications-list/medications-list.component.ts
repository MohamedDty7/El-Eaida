import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  form: string;
  manufacturer: string;
  price: number;
  stock: number;
  status: 'available' | 'out_of_stock' | 'discontinued';
  statusText: string;
}

@Component({
  selector: 'app-medications-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.css']
})
export class MedicationsListComponent implements OnInit {
  medications: Medication[] = [];
  filteredMedications: Medication[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockData();
    this.filterMedications();
  }

  private loadMockData(): void {
    this.medications = [
      {
        id: '1',
        name: 'باراسيتامول',
        dosage: '500mg',
        form: 'أقراص',
        manufacturer: 'شركة الدواء',
        price: 15.50,
        stock: 150,
        status: 'available',
        statusText: 'متوفر'
      },
      {
        id: '2',
        name: 'إيبوبروفين',
        dosage: '400mg',
        form: 'كبسولات',
        manufacturer: 'شركة الصحة',
        price: 25.00,
        stock: 0,
        status: 'out_of_stock',
        statusText: 'نفد المخزون'
      },
      {
        id: '3',
        name: 'أموكسيسيلين',
        dosage: '250mg',
        form: 'كبسولات',
        manufacturer: 'شركة الأطباء',
        price: 45.75,
        stock: 75,
        status: 'available',
        statusText: 'متوفر'
      }
    ];
  }

  filterMedications(): void {
    this.filteredMedications = this.medications.filter(medication => {
      const searchLower = this.searchTerm.toLowerCase();
      return medication.name.toLowerCase().includes(searchLower) ||
             medication.manufacturer.toLowerCase().includes(searchLower) ||
             medication.form.toLowerCase().includes(searchLower);
    });
    
    this.totalPages = Math.ceil(this.filteredMedications.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this.filterMedications();
  }

  viewMedication(medication: Medication): void {
    console.log('View medication:', medication);
  }

  editMedication(medication: Medication): void {
    this.router.navigate(['/admin/medications/edit', medication.id]);
  }

  deleteMedication(medication: Medication): void {
    console.log('Delete medication:', medication);
  }

  addNewMedication(): void {
    this.router.navigate(['/admin/medications/add']);
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

  get paginatedMedications(): Medication[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredMedications.slice(startIndex, endIndex);
  }
}

