import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeComponent } from './coffee/coffee.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { By } from '@angular/platform-browser';  // Importamos By para hacer consultas al DOM

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
      ],
      declarations: [
        AppComponent, 
        CoffeeComponent, 
        FooterComponent, 
        HeaderComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PARCIALMISW410'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PARCIALMISW410');
  });

  it('should render app-header component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
  });

  it('should render app-coffee component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const coffee = fixture.debugElement.query(By.css('app-coffee'));
    expect(coffee).toBeTruthy();
  });

  it('should render app-footer component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(footer).toBeTruthy();
  });
});
