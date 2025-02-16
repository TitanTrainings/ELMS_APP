import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeaveCommentComponent } from './manager-leave-comment.component';

describe('ManagerLeaveCommentComponent', () => {
  let component: ManagerLeaveCommentComponent;
  let fixture: ComponentFixture<ManagerLeaveCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerLeaveCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerLeaveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
