import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlotPage } from './slot.page';

describe('SlotPage', () => {
  let component: SlotPage;
  let fixture: ComponentFixture<SlotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
