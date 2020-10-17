import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSlotPage } from './create-slot.page';

describe('CreateSlotPage', () => {
  let component: CreateSlotPage;
  let fixture: ComponentFixture<CreateSlotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSlotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
