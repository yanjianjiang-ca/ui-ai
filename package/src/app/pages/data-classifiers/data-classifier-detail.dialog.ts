import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { DataClassifier } from '../../services/data-classifiers.service';

@Component({
  selector: 'app-data-classifier-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MaterialModule],
  template: `
  <h2 mat-dialog-title>Data Classifier Details</h2>
  <mat-dialog-content class="m-t-8">
    <div class="m-b-8"><strong>Name:</strong> {{ data.name }}</div>
    <div class="m-b-8"><strong>Sensitivity:</strong> {{ data.sensitivity }}</div>
    <div class="m-b-8"><strong>Type:</strong> {{ data.type }}</div>
    <div class="m-b-8"><strong>Policies:</strong> {{ data.policies }}</div>
    <div class="m-b-8"><strong>Scans:</strong> {{ data.scans }}</div>
    <div class="m-b-8"><strong>Created By:</strong> {{ data.createdBy }}</div>
    <div class="m-b-8"><strong>Created:</strong> {{ data.createdAt }}</div>
    <div class="m-b-8" *ngIf="data.notes"><strong>Notes:</strong> {{ data.notes }}</div>
    <mat-divider class="m-y-12"></mat-divider>
    <div>Logic: <strong>AND</strong></div>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-flat-button mat-dialog-close color="primary">Close</button>
  </mat-dialog-actions>
  `,
})
export class DataClassifierDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataClassifier) {}
}

