import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})

export class TripCard implements OnInit {
  @Input('trip') trip: any;
  
  constructor() {}
  
  ngOnInit(): void {}
}
