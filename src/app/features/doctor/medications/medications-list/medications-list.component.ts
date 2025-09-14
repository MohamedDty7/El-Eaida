import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medications-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medications-list.component.html',
  styleUrl: './medications-list.component.css'
})
export class MedicationsListComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'all';
  selectedStatus = 'all';
  
  medications = [
    {
      id: 1,
      name: 'باراسيتامول',
      genericName: 'Acetaminophen',
      category: 'مسكنات',
      dosage: '500mg',
      form: 'أقراص',
      status: 'متوفر',
      stock: 150,
      price: 25.50,
      manufacturer: 'شركة الأدوية السعودية',
      description: 'مسكن للآلام وخافض للحرارة'
    },
    {
      id: 2,
      name: 'أموكسيسيلين',
      genericName: 'Amoxicillin',
      category: 'مضادات حيوية',
      dosage: '250mg',
      form: 'كبسولات',
      status: 'متوفر',
      stock: 75,
      price: 45.00,
      manufacturer: 'شركة الصحة العالمية',
      description: 'مضاد حيوي واسع الطيف'
    },
    {
      id: 3,
      name: 'أوميبرازول',
      genericName: 'Omeprazole',
      category: 'مضادات الحموضة',
      dosage: '20mg',
      form: 'كبسولات',
      status: 'ناقص',
      stock: 5,
      price: 35.75,
      manufacturer: 'شركة الدواء المتقدم',
      description: 'مثبط مضخة البروتون'
    },
    {
      id: 4,
      name: 'فيتامين د',
      genericName: 'Vitamin D3',
      category: 'فيتامينات',
      dosage: '1000 IU',
      form: 'كبسولات',
      status: 'غير متوفر',
      stock: 0,
      price: 30.00,
      manufacturer: 'شركة الفيتامينات الطبيعية',
      description: 'مكمل غذائي لفيتامين د'
    }
  ];

  categories = [
    'مسكنات',
    'مضادات حيوية',
    'مضادات الحموضة',
    'فيتامينات',
    'أدوية القلب',
    'أدوية السكري',
    'أدوية الضغط',
    'أدوية الحساسية'
  ];

  filteredMedications = [...this.medications];

  ngOnInit(): void {
    this.filterMedications();
  }

  filterMedications(): void {
    this.filteredMedications = this.medications.filter(medication => {
      const matchesSearch = medication.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          medication.genericName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          medication.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || medication.category === this.selectedCategory;
      const matchesStatus = this.selectedStatus === 'all' || medication.status === this.selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterMedications();
  }

  onCategoryChange(): void {
    this.filterMedications();
  }

  onStatusChange(): void {
    this.filterMedications();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'متوفر':
        return 'status-available';
      case 'ناقص':
        return 'status-low';
      case 'غير متوفر':
        return 'status-unavailable';
      default:
        return 'status-unknown';
    }
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'stock-empty';
    if (stock < 20) return 'stock-low';
    if (stock < 50) return 'stock-medium';
    return 'stock-high';
  }

  prescribeMedication(medication: any): void {
    // Navigate to prescription form
    console.log('Prescribing medication:', medication.name);
  }
}