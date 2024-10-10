import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlainComponent } from './userlain.component';

describe('UserlainComponent', () => {
  let component: UserlainComponent;
  let fixture: ComponentFixture<UserlainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserlainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
