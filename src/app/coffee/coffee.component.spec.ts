import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CoffeeComponent } from './coffee.component';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from './coffee';
import { faker } from '@faker-js/faker';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('CoffeeComponent', () => {
    let component: CoffeeComponent;
    let fixture: ComponentFixture<CoffeeComponent>;
    let debug: DebugElement;
    let coffeeService: jasmine.SpyObj<CoffeeService>;
    const numberOfCoffees = 3; // Cambiado a 3

    // Función para crear un café mockeado con faker
    const createMockCoffee = (): Coffee => ({
        id: faker.number.int(),
        nombre: faker.commerce.productName(),
        tipo: faker.helpers.arrayElement(['Blend', 'Origen']),
        region: faker.location.country(),
        sabor: faker.lorem.words(3),
        altura: faker.number.int({ min: 800, max: 2000 }),
        imagen: faker.image.url(),
    });

    // Generar un array de cafés mockeados con faker
    const mockCoffees: Coffee[] = Array.from({ length: numberOfCoffees }).map(createMockCoffee);

    beforeEach(waitForAsync(() => {
        const coffeeServiceSpy = jasmine.createSpyObj('CoffeeService', ['getCoffees']);
        coffeeServiceSpy.getCoffees.and.returnValue(of(mockCoffees));

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [CoffeeComponent],
            providers: [
                { provide: CoffeeService, useValue: coffeeServiceSpy },
            ],
        }).compileComponents();

        coffeeService = TestBed.inject(CoffeeService) as jasmine.SpyObj<CoffeeService>;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoffeeComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getCoffeesList on ngOnInit', () => {
        expect(coffeeService.getCoffees).toHaveBeenCalledTimes(1);
    });

    it('should populate the coffees array with data from the service', () => {
        expect(component.coffees).toEqual(mockCoffees);
    });

    it('should calculate blendCoffees and originCoffees correctly', () => {
        const expectedBlend = mockCoffees.filter(coffee => coffee.tipo === 'Blend').length;
        const expectedOrigin = mockCoffees.filter(coffee => coffee.tipo === 'Origen').length;
        expect(component.blendCoffees).toBe(expectedBlend);
        expect(component.originCoffees).toBe(expectedOrigin);
    });

    it(`should render ${numberOfCoffees} rows in the table`, () => {
        const rows = debug.queryAll(By.css('tbody tr'));
        expect(rows.length).toBe(numberOfCoffees);
    });

    it('should render the coffee data in the table rows', () => {
        const rows = debug.queryAll(By.css('tbody tr'));
        rows.forEach((row, index) => {
            const columns = row.queryAll(By.css('th, td'));
            expect(columns[0].nativeElement.textContent).toContain(mockCoffees[index].id);
            expect(columns[1].nativeElement.textContent).toContain(mockCoffees[index].nombre);
            expect(columns[2].nativeElement.textContent).toContain(mockCoffees[index].tipo);
            expect(columns[3].nativeElement.textContent).toContain(mockCoffees[index].region);
        });
    });

    it('should render the total number of origin coffees', () => {
        const originParagraph = debug.query(By.css('p:nth-child(2)')).nativeElement;
        expect(originParagraph.textContent).toContain(`Total café de origen: ${component.originCoffees}`);
    });

    it('should render the total number of blend coffees', () => {
        const blendParagraph = debug.query(By.css('p:nth-child(3)')).nativeElement;
        expect(blendParagraph.textContent).toContain(`Total café blend: ${component.blendCoffees}`);
    });
});