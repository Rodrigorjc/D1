import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRutaComponent } from './vista-ruta.component';

describe('VistaRutaComponent', () => {
  let component: VistaRutaComponent;
  let fixture: ComponentFixture<VistaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
