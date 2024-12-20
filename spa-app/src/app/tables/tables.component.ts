import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { HomeService } from './api.service';
import { ReservasI } from '../interfaces/reservas.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  styleUrls: ['./tables.component.css'], // Cambiado a styleUrls
  templateUrl: './tables.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    CommonModule,
  ],
})
export class TablesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  reserva: ReservasI[] = [];
  dataSource = new MatTableDataSource<ReservasI>([]);

  displayedColumns: string[] = [
    'id',
    'cliente',
    'departamento',
    'entrada',
    'salida',
    'estado',
    // 'accionAceptar',
    // 'accionRechazar',
  ];

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private homeService: HomeService) {
    
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (
      data: ReservasI,
      filter: string
    ): boolean => {
      const lowerCaseFilter = filter.trim().toLowerCase();

      // Convertir las fechas a cadena para filtrar
      const entradaString =
        data.entrada instanceof Date ? data.entrada.toISOString() : data.entrada;
      const salidaString =
        data.salida instanceof Date ? data.salida.toISOString() : data.salida;

      // Combinar todas las propiedades en una sola cadena para buscar
      return (
        data.id.toString().toLowerCase().includes(lowerCaseFilter) ||
        data.usuario.nombre.toLowerCase().includes(lowerCaseFilter) ||
        data.departamento.nombre.toLowerCase().includes(lowerCaseFilter) ||
        entradaString.toLowerCase().includes(lowerCaseFilter) ||
        salidaString.toLowerCase().includes(lowerCaseFilter) ||
        data.estado.toLowerCase().includes(lowerCaseFilter) 
      );
    };
  }

  sortedData!: ReservasI[];

  // Vincula el MatSort
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.fetchReservas();
  }

  fetchReservas() {

    const currentPageIndex = this.paginator?.pageIndex || 0;

    this.homeService.getAllReservas().subscribe({
      next: (response) => {
        console.log('Objeto response completo:', response);
        if (response.ok) {
          console.log('response fue ok(entra al if)')
          this.reserva = response.result.data;
          this.dataSource.data = this.reserva;
          this.paginator.pageIndex = currentPageIndex;

          this.dataSource.sortingDataAccessor = (data, header) => {
            switch (header) {
              case 'cliente':
                return data.usuario.nombre.toLowerCase();
              case 'departamento':
                return data.departamento.nombre.toLowerCase();
              case 'entrada':
                return new Date(data.entrada).getTime();
              case 'salida':
                return new Date(data.salida).getTime();
              case 'estado':
                return data.estado.toLowerCase();
              default:
                return (data as any)[header];
            }
          };
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Error en la respuesta:', response.msg);
        }
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
      },
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Ordenado en orden ${sortState.direction}`);
    } else {
      this._liveAnnouncer.announce('Orden eliminado');
    }
  }

  rechazadaReserva(id: number) {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas rechazar esta reserva?'
    );
  
    if (confirmacion) {
      this.homeService.rechazadoReserva(id).subscribe({
        next: () => {
          this.fetchReservas(); // Actualiza los datos manteniendo la página actual.
        },
        error: (err) => console.error('Error al rechazar la reserva:', err),
      });
    }
  }

  activadaReserva(id: number) {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas aceptar esta reserva?'
    );
  
    if (confirmacion) {
      this.homeService.activarReserva(id).subscribe({
        next: () => {
          this.fetchReservas(); // Actualiza los datos manteniendo la página actual.
        },
        error: (err) => console.error('Error al aceptar la reserva:', err),
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reinicia la paginación al aplicar un filtro
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
