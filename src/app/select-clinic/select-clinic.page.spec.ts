import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectClinicPage } from './select-clinic.page';

describe('SelectClinicPage', () => {
  let component: SelectClinicPage;
  let fixture: ComponentFixture<SelectClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
