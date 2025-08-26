import { Component, ViewEncapsulation, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

type Sensitivity = 'Highly Confidential' | 'Restricted' | 'Internal' | 'Public' | 'Confidential';

export interface DataClassifierRow {
  id: string;
  name: string;
  sensitivity: Sensitivity;
  type: 'Simple' | 'Composite';
  policies: number;
  scans: number;
  createdBy: string;
  createdAt: string; // ISO or friendly string
  notes?: string;
}

interface ClassificationDetailSection {
  title: string;
  items: string[];
  note?: string;
}

@Component({
  selector: 'app-data-classifiers',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './data-classifiers.component.html',
  styleUrls: ['./data-classifiers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataClassifiersComponent {
  displayedColumns = ['name', 'sensitivity', 'type', 'policies', 'scans', 'createdBy', 'createdAt', 'notes', 'actions'];

  // Mock table data roughly matching the screenshot
  rows = signal<DataClassifierRow[]>([
    { id: '1', name: 'My First Test Classifier', sensitivity: 'Highly Confidential', type: 'Simple', policies: 5, scans: 2, createdBy: 'jbrigs', createdAt: '2024/05/01 00:00 AM PDT', notes: 'Test Rule' },
    { id: '2', name: 'My Second Test Classifier', sensitivity: 'Restricted', type: 'Simple', policies: 2, scans: 3, createdBy: 'aaruda', createdAt: '2024/05/01 00:00 AM PDT', notes: 'Test Rule' },
    { id: '3', name: 'My Third Test Classifier', sensitivity: 'Internal', type: 'Simple', policies: 6, scans: 1, createdBy: 'lmiller', createdAt: '2024/05/01 00:00 AM PDT', notes: 'Test Rule' },
    { id: '4', name: 'My Fourth Test Classifier', sensitivity: 'Public', type: 'Simple', policies: 1, scans: 1, createdBy: 'jsmith', createdAt: '2024/05/01 00:00 AM PDT', notes: 'Test Rule' },
    { id: '5', name: 'My Fifth Test Classifier', sensitivity: 'Confidential', type: 'Composite', policies: 1, scans: 1, createdBy: 'swendy', createdAt: '2024/05/01 00:00 AM PDT', notes: 'Test Rule' },
  ]);

  query = signal('');
  selectedId = signal<string | null>(null);
  selected = computed(() => this.rows().find(r => r.id === this.selectedId()) ?? null);

  filteredRows = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.rows();
    return this.rows().filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.sensitivity.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.createdBy.toLowerCase().includes(q)
    );
  });

  onRowClick(row: DataClassifierRow) {
    this.selectedId.set(row.id);
  }

  clearSelection() {
    this.selectedId.set(null);
  }
}

