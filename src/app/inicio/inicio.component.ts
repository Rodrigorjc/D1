import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {
  rutasMasVisitadas = [
    {
      id: 1,
      nombre: 'Carmona - Sevilla',
      center: [40.73061, -73.935242] as [number, number],
      zoom: 14,
      coordenadas: [
        [40.73061, -73.935242] as [number, number],
        [40.73161, -73.935242] as [number, number],
        [40.73161, -73.925242] as [number, number],
        [40.73261, -73.925242] as [number, number]
      ]
    },
    {
      id: 2,
      nombre: 'Singapur - Kuala Lumpur',
      center: [40.73161, -73.925242] as [number, number],
      zoom: 14,
      coordenadas: [
        [40.73161, -73.925242] as [number, number],
        [40.73261, -73.925242] as [number, number],
        [40.73261, -73.915242] as [number, number],
        [40.73361, -73.915242] as [number, number]
      ]
    },
    {
      id: 3,
      nombre: 'Manila - Cebú',
      center: [40.73261, -73.915242] as [number, number],
      zoom: 14,
      coordenadas: [
        [40.73261, -73.915242] as [number, number],
        [40.73361, -73.915242] as [number, number],
        [40.73461, -73.905242] as [number, number],
        [40.73561, -73.905242] as [number, number]
      ]
    }

  ];

  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  irADetalleRuta(id: number) {
    this.router.navigate(['/ruta', id]);
  }

  ngOnInit() {
    this.seleccionarRutaAleatoria();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Realiza la importación de Leaflet en tiempo de ejecución
      import('leaflet').then(L => {
        // Inicializa los mapas para las rutas más visitadas
        this.rutasMasVisitadas.forEach(ruta => {
          this.initMap('map-' + ruta.id, ruta.center, ruta.zoom, L, ruta.coordenadas);
        });
        // Inicializa el mapa para la ruta cercana
        this.rutasCercanas.forEach(ruta => {
          this.initMap('map-' + ruta.id, ruta.center, ruta.zoom, L, ruta.coordenadas);
        });
        // Inicializa el mapa para la ruta  mejor valorada
        this.rutasMejorValoradas.forEach(ruta => {
          this.initMap('map-' + ruta.id, ruta.center, ruta.zoom, L, ruta.coordenadas);
        });
        // Inicializa el mapa para la ruta mis rutas
        this.misRutas.forEach(ruta => {
          this.initMap('map-' + ruta.id, ruta.center, ruta.zoom, L, ruta.coordenadas);
        });

        // Inicializa el mapa para la ruta seleccionada con una ubicación aleatoria
        if (this.rutaSeleccionada) {
          const ubicacionAleatoria = this.seleccionarUbicacionAleatoria();
          this.initMap('map-' + this.rutaSeleccionada.id, ubicacionAleatoria.center, ubicacionAleatoria.zoom, L, []);
        }
      });
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

  // Ruta principal
  rutas = [
    { id: 6, nombre: 'Ruta de la Aventura', creador: 'Explorador Urbano', descripcion: 'Una emocionante ruta que te lleva por los lugares más recónditos de la ciudad, explorando callejones, parques escondidos y edificios históricos. Ideal para quienes buscan descubrir la esencia oculta de la vida urbana.' },
    { id: 7, nombre: 'Caminos del Silencio', creador: 'Senderista Solitario', descripcion: 'Un sendero que se adentra en paisajes tranquilos y apartados, donde la naturaleza se manifiesta en su máximo esplendor. Es perfecto para aquellos que buscan un momento de reflexión y calma, alejados del bullicio de la vida cotidiana.' },
    { id: 8, nombre: 'Ruta del Horizonte', creador: 'Viajero de las Estrellas', descripcion: 'Una ruta que ofrece vistas panorámicas impresionantes, permitiendo disfrutar de un atardecer que se funde con el horizonte. A lo largo del recorrido, se encuentran miradores y puntos de descanso para admirar la belleza del paisaje.' },
    { id: 9, nombre: 'Ruta del Amanecer', creador: 'Caminante del Alba', descripcion: 'Esta ruta te lleva a través de un viaje que comienza en la oscuridad de la madrugada y termina con los primeros rayos de sol. El recorrido incluye colinas y senderos que se iluminan suavemente, brindando una experiencia mágica para los madrugadores.' },
    { id: 10, nombre: 'Sendero del Río', creador: 'Navegante del Río', descripcion: 'Un camino que serpentea junto a un río cristalino, atravesando bosques y pequeños puentes de madera. La ruta es ideal para quienes desean conectar con la naturaleza y disfrutar del sonido relajante del agua fluyendo a su lado.' }
  ];
  rutasCercanas = [
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
    }
    ];
    rutasMejorValoradas = [
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
      }
      ];
      misRutas = [
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
        deportes = [
          { id: 1, nombre: 'Ciclismo', img: 'ciclismo.png' },
          { id: 2, nombre: 'Senderismo', img: 'senderismo.png' },
          { id: 3, nombre: 'Natación', img: 'nadar.png' },
          { id: 4, nombre: 'Running', img: 'run.png' }
        ];
        amigos = [
          { id: 1, nombre: 'Juan Pérez', img: 'juan.png' },
          { id: 2, nombre: 'María López', img: 'maria.png' },
          { id: 3, nombre: 'Carlos Sánchez', img: 'paco.png' },
          { id: 4, nombre: 'Ana Gómez', img: 'ana.png' }
        ];

  rutaSeleccionada: any = null;
  // seleccionar ruta aleatoria para ruta principal
  seleccionarRutaAleatoria() {
    if (this.rutas.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.rutas.length);
      this.rutaSeleccionada = this.rutas[indiceAleatorio];
    } else {
      // Manejo del caso en el que no haya rutas disponibles
      this.rutaSeleccionada = { id: 0, nombre: 'No hay rutas disponibles', creador: '', descripcion: '' };
    }
  }

  seleccionarUbicacionAleatoria() {
    const ubicaciones = [
      { center: [51.505, -0.09] as [number, number], zoom: 13 },
      { center: [48.8566, 2.3522] as [number, number], zoom: 12 }, // París
      { center: [40.7128, -74.0060] as [number, number], zoom: 14 }, // Nueva York
      { center: [34.0522, -118.2437] as [number, number], zoom: 13 }, // Los Ángeles
      { center: [35.6895, 139.6917] as [number, number], zoom: 12 }  // Tokio
    ];
    const indiceAleatorio = Math.floor(Math.random() * ubicaciones.length);
    return ubicaciones[indiceAleatorio];
  }
  
}