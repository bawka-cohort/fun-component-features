import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';

@Component({
  selector: 'heatmap-component',
  imports: [],
  template: `
    <div
      id="map"
      style="height: 500px; width: 100%; border-radius: 10px;"
    ></div>
  `,
  styles: ``,
  standalone: true
})
export class HeatmapComponent implements AfterViewInit {
  private map!: L.Map;

  // Sample data: [lat, lng, intensity]
  private heatmapData: [number, number, number][] = [
    [40.7128, -74.0060, 0.5],   // NYC
    [34.0522, -118.2437, 0.8],  // LA
    [41.8781, -87.6298, 0.6],   // Chicago
    [37.7749, -122.4194, 0.9],  // SF
    [47.6062, -122.3321, 0.3],  // Seattle
  ];

  ngAfterViewInit(): void {
    this.initMap();
    this.addHeatLayer();
  }

  private initMap(): void {
    this.map = L.map('map').setView([39.8283, -98.5795], 4); // Centered on US

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addHeatLayer(): void {
    const heat = (L as any).heatLayer(this.heatmapData, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
    }).addTo(this.map);
  }
}
