/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoffeeService } from './coffee.service';
import { Coffee } from '../coffee/coffee';
import { environment } from '../../environments/environment.development';

describe('Service: Coffee', () => {
  let service: CoffeeService;
  let httpMock: HttpTestingController;

  const mockCoffees: Coffee[] = [
    { id: 1, nombre: 'Café Espresso', tipo: 'Blend', region: 'Colombia', sabor: 'Intenso', altura: 1200, imagen: 'url-imagen' },
    { id: 2, nombre: 'Café Americano', tipo: 'Origen', region: 'Brasil', sabor: 'Suave', altura: 1000, imagen: 'url-imagen' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoffeeService]
    });

    service = TestBed.inject(CoffeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of coffees when getCoffees is called', () => {
    service.getCoffees().subscribe(coffees => {
      expect(coffees.length).toBe(2);
      expect(coffees).toEqual(mockCoffees); 
    });

    const req = httpMock.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCoffees);
  });

  it('should handle error when the API fails', () => {
    const errorMessage = 'Failed to load data';

    service.getCoffees().subscribe(
      () => fail('expected an error, not coffees'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    // Simulamos un error HTTP
    const req = httpMock.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});

