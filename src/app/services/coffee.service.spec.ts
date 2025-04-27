/* tslint:disable:no-unused-variable 

import { TestBed, inject } from '@angular/core/testing';
import { CoffeeService } from './coffee.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Coffee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoffeeService]
    });
  });

  it('should be created', inject([CoffeeService], (service: CoffeeService) => {
    expect(service).toBeTruthy();
  }));
});*/

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoffeeService } from './coffee.service';
import { Coffee } from '../coffee/coffee';
import { environment } from '../../environments/environment.development';

describe('Service: Coffee', () => {
  let service: CoffeeService;
  let httpMock: HttpTestingController;  // Usamos esto para mockear las peticiones HTTP

  const mockCoffees: Coffee[] = [
    { id: 1, nombre: 'Café Espresso', tipo: 'Blend', region: 'Colombia', sabor: 'Intenso', altura: 1200, imagen: 'url-imagen' },
    { id: 2, nombre: 'Café Americano', tipo: 'Origen', region: 'Brasil', sabor: 'Suave', altura: 1000, imagen: 'url-imagen' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Simula las peticiones HTTP
      providers: [CoffeeService]
    });

    service = TestBed.inject(CoffeeService);
    httpMock = TestBed.inject(HttpTestingController);  // Accedemos al controlador HTTP para mockear
  });

  afterEach(() => {
    // Verifica que no haya ninguna solicitud HTTP pendiente
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of coffees when getCoffees is called', () => {
    service.getCoffees().subscribe(coffees => {
      expect(coffees.length).toBe(2);  // Debería tener 2 cafés
      expect(coffees).toEqual(mockCoffees);  // Comparar los datos
    });

    // Simulamos la respuesta HTTP
    const req = httpMock.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toBe('GET');  // Verificar que el método sea GET
    req.flush(mockCoffees);  // Le decimos al mock que devuelva los datos
  });

  it('should handle error when the API fails', () => {
    const errorMessage = 'Failed to load data';

    service.getCoffees().subscribe(
      () => fail('expected an error, not coffees'),
      (error) => {
        expect(error.status).toBe(500);  // Verificamos que el error sea el esperado
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    // Simulamos un error HTTP
    const req = httpMock.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});

