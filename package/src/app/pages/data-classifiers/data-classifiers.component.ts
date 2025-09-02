import { Component, ViewChild, ViewEncapsulation, signal, computed, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DataClassifiersService, DataClassifier } from '../../services/data-classifiers.service';
import { DataClassifierDetailDialogComponent } from './data-classifier-detail.dialog';

interface ClassificationDetailSection {
  title: string;
  items: string[];
  note?: string;
}

@Component({
  selector: 'app-data-classifiers',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, TablerIconsModule],
  templateUrl: './data-classifiers.component.html',
  styleUrls: ['./data-classifiers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataClassifiersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'sensitivity', 'type', 'policies', 'scans', 'createdBy', 'createdAt', 'notes', 'actions'];

  dataSource = new MatTableDataSource<DataClassifier>([]);
  loading = signal<boolean>(true);
  lastLoaded = signal<Date | null>(null);

  query = signal('');
  selectedId = signal<string | null>(null);
  selected = computed(() => this.dataSource.data.find(r => r.id === this.selectedId()) ?? null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly svc: DataClassifiersService, private readonly dialog: MatDialog) {}

  private load(): void {
    this.loading.set(true);
    this.svc.list().subscribe(rows => {
      this.dataSource.data = rows;
      this.loading.set(false);
      this.lastLoaded.set(new Date());
      this.applyFilter(this.query());
    });
  }

  refresh(): void {
    this.load();
  }

  ngOnInit(): void {
    this.load();
    this.dataSource.filterPredicate = (r, filter) => {
      const term = filter.trim().toLowerCase();
      return (
        r.name.toLowerCase().includes(term) ||
        r.sensitivity.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term) ||
        r.createdBy.toLowerCase().includes(term)
      );
    };
  }

  sensitivityClass(s: string): string {
    const v = (s || '').toLowerCase();
    if (v.includes('high')) return 'sensitivity-high';
    if (v.includes('restricted')) return 'sensitivity-restricted';
    if (v.includes('confidential')) return 'sensitivity-confidential';
    if (v.includes('internal')) return 'sensitivity-internal';
    if (v.includes('public')) return 'sensitivity-public';
    return 'sensitivity-default';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    this.query.set(value);
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(row: DataClassifier) {
    this.selectedId.set(row.id);
  }

  onRowDblClick(row: DataClassifier) {
    this.dialog.open(DataClassifierDetailDialogComponent, { data: row, width: '640px' });
  }

  clearSelection() {
    this.selectedId.set(null);
  }

  onAdd() {
    const now = new Date();
    const newItem: DataClassifier = {
      id: String(now.getTime()),
      name: 'New Data Classifier',
      sensitivity: 'Internal',
      type: 'Simple',
      policies: 0,
      scans: 0,
      createdBy: 'system',
      createdAt: now.toISOString(),
      notes: ''
    } as DataClassifier;
    this.dialog.open(DataClassifierDetailDialogComponent, { data: newItem, width: '640px' });
  }
}
