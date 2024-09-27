import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-vista-ruta',
  templateUrl: './vista-ruta.component.html',
  styleUrls: ['./vista-ruta.component.css']
})
export class VistaRutaComponent implements OnInit, AfterViewInit {
  rutaId: number | null = null;
  rutaNombre: string | null | undefined;
  rutaDescripcion: string | null | undefined;
  rutaCreador: string | null | undefined;
  rutaCoordenadas: any[] = []; // Almacena las coordenadas de la ruta
  isBrowser: boolean;
  isFavorite: boolean = false; // Estado del icono de favorito


  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rutaId = Number(params.get('id'));
      this.cargarRuta(); // Llama a la función para cargar la ruta
    });
  }

  cargarRuta(): void {
    const rutas = [
      {
        id: 1,
        nombre: 'Carmona - Sevilla',
        creador: 'Juan Pérez',
        descripcion: 'Una ruta escénica que conecta la histórica ciudad de Carmona con la vibrante ciudad de Sevilla. Esta ruta es ideal para aquellos que desean explorar la rica historia y cultura de Andalucía, pasando por paisajes pintorescos y monumentos históricos.',
        center: [40.73061, -73.935242] as [number, number],
        zoom: 14,
        coordenadas: [
          [37.50565, -5.61561], // Carmona
          [37.51565, -5.61561], // Un poco al norte
          [37.52565, -5.61000], // Desviación a la derecha
          [37.53000, -5.60500], // Hacia el este
          [37.54000, -5.60000], // Continúa hacia el este
          [37.55000, -5.59000], // En dirección a Sevilla
          [37.56400, -5.55000], // Acercándose a Sevilla
          [37.57700, -5.52700], // Entrando a Sevilla
          [37.60100, -5.50000],
        ]
      },
      {
        id: 2,
        nombre: 'Singapur - Kuala Lumpur',
        creador: 'María Gómez',
        descripcion: 'Una ruta internacional que une la moderna ciudad de Singapur con la capital de Malasia, Kuala Lumpur. Esta ruta es perfecta para los viajeros que desean experimentar la mezcla de culturas y la modernidad de estas dos ciudades asiáticas, con paradas en lugares emblemáticos y centros comerciales.',
        center: [40.73161, -73.925242] as [number, number],
        zoom: 14,
        coordenadas: [
          [1.3521, 103.8198], // Singapur
          [1.3571, 103.8250], // Desviación al norte
          [1.3600, 103.8300], // Hacia el norte
          [1.3700, 103.8400], // Avanzando
          [1.3850, 103.8500], // Progresando hacia Malasia
          [1.4031, 102.6001], // En Malasia
          [3.139,"101.6869"], // Kuala Lumpur
        ]
      },
      {
        id: 3,
        nombre: 'Manila - Cebú',
        creador: 'Carlos Rodríguez',
        descripcion: 'Una ruta que conecta la capital de Filipinas, Manila, con la ciudad de Cebú, conocida por sus playas y vida marina. Esta ruta es ideal para los amantes de la naturaleza y el mar, ofreciendo vistas impresionantes y la oportunidad de explorar la biodiversidad marina de Filipinas.',
        center: [40.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [14.5995, 120.9842], // Manila
          [14.6000, 120.9900], // Desviación hacia el oeste
          [14.6050, 120.9950], // Progresando hacia el suroeste
          [14.6100, 121.0000], // Avanzando
          [14.6200, 121.0100], // Acercándose a Cebú
          [10.3157, 123.8854], // Cebú
        ]
      },
      {
        id: 11,
        nombre: 'Ruta de la Montaña',
        creador: 'Montañista Intrépido',
        descripcion: 'Una ruta que te lleva a través de senderos empinados y paisajes montañosos, desafiando tu resistencia y habilidades de escalada. Es perfecta para los amantes de la aventura y la adrenalina.',
        center: [40.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 12,
        nombre: 'Caminos del Bosque',
        creador: 'Explorador del Bosque',
        descripcion: 'Un sendero que se adentra en la espesura de un bosque antiguo, rodeado de árboles centenarios y fauna silvestre. Es ideal para quienes buscan una experiencia inmersiva en la naturaleza.',
        center: [40.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 13,
        nombre: 'Ruta de la Costa',
        creador: 'Navegante del Mar',
        descripcion: 'Una ruta que bordea la costa, ofreciendo vistas panorámicas del océano y la brisa marina. A lo largo del recorrido, se encuentran acantilados, playas y faros que dan un toque mágico al paisaje.',
        center: [40.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 14,
        nombre: 'Ruta de la Montaña',
        creador: 'Montañista Intrépido',
        descripcion: 'Una ruta que te lleva a través de senderos empinados y paisajes montañosos, desafiando tu resistencia y habilidades de escalada. Es perfecta para los amantes de la aventura y la adrenalina.',
        center: [4.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 15,
        nombre: 'Caminos del Bosque',
        creador: 'Explorador del Bosque',
        descripcion: 'Un sendero que se adentra en la espesura de un bosque antiguo, rodeado de árboles centenarios y fauna silvestre. Es ideal para quienes buscan una experiencia inmersiva en la naturaleza.',
        center: [4.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 16,
        nombre: 'Ruta de la Costa',
        creador: 'Navegante del Mar',
        descripcion: 'Una ruta que bordea la costa, ofreciendo vistas panorámicas del océano y la brisa marina. A lo largo del recorrido, se encuentran acantilados, playas y faros que dan un toque mágico al paisaje.',
        center: [4.73261, -73.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 17,
        nombre: 'Ruta de la Montaña',
        creador: 'Montañista Intrépido',
        descripcion: 'Una ruta que te lleva a través de senderos empinados y paisajes montañosos, desafiando tu resistencia y habilidades de escalada. Es perfecta para los amantes de la aventura y la adrenalina.',
        center: [8.73261, 3.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 18,
        nombre: 'Caminos del Bosque',
        creador: 'Explorador del Bosque',
        descripcion: 'Un sendero que se adentra en la espesura de un bosque antiguo, rodeado de árboles centenarios y fauna silvestre. Es ideal para quienes buscan una experiencia inmersiva en la naturaleza.',
        center: [8.73261, 3.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      },
      {
        id: 19,
        nombre: 'Ruta de la Costa',
        creador: 'Navegante del Mar',
        descripcion: 'Una ruta que bordea la costa, ofreciendo vistas panorámicas del océano y la brisa marina. A lo largo del recorrido, se encuentran acantilados, playas y faros que dan un toque mágico al paisaje.',
        center: [8.73261, 3.915242] as [number, number],
        zoom: 14,
        coordenadas: [
          [40.73261, -73.915242] as [number, number],
          [40.73361, -73.915242] as [number, number],
          [40.73461, -73.905242] as [number, number],
          [40.73561, -73.905242] as [number, number]
        ]
      }
    ];

    const ruta = rutas.find(ruta => ruta.id === this.rutaId);
    if (ruta) {
      this.rutaNombre = ruta.nombre;
      this.rutaDescripcion = ruta.descripcion;
      this.rutaCreador = ruta.creador;
      this.rutaCoordenadas = ruta.coordenadas; // Almacena las coordenadas de la ruta si es necesario
    }
  }



  private initMap(mapId: string, center: [number, number], zoom: number, L: any, coordenadas: [number, number][]): void {
    const mapElement = document.getElementById(mapId);
    if (mapElement) {
      const map = L.map(mapId).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Dibuja la ruta específica de este mapa
      if (coordenadas.length > 0) {
        L.polyline(coordenadas, {
          color: 'blue', // Color de la línea
          weight: 5,     // Grosor de la línea
          opacity: 0.7   // Opacidad de la línea
        }).addTo(map);
      }

      // Puedes agregar marcadores de la siguiente forma
      // L.marker(center).addTo(map).bindPopup('¡Aquí comienza la ruta!').openPopup();
    }
 
   }
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Realiza la importación de Leaflet en tiempo de ejecución
      import('leaflet').then(L => {
        // Inicializa el mapa para la ruta seleccionada
        if (this.rutaCoordenadas.length > 0) {
          this.initMap('map', this.rutaCoordenadas[0], 13, L, this.rutaCoordenadas);
        }
      });

      const heart = document.getElementById('heart');
      if (heart) {
        heart.addEventListener('click', () => {
          heart.classList.toggle('filled'); // Cambia la clase para el corazón
          if (heart.classList.contains('filled')) {
            heart.className = "fas fa-heart"; // Cambia a corazón lleno
          } else {
            heart.className = "far fa-heart"; // Cambia a corazón vacío
          }
        });
      }
    }
  }
}
