import { ComponentFixture, TestBed } from '@angular/core/testing';

import { courseNavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: courseNavBarComponent;
  let fixture: ComponentFixture<courseNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ courseNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(courseNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
