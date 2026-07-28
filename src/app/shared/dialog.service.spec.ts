import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    service = new DialogService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('resolves to true when the user confirms', (done) => {
    spyOn(window, 'confirm').and.returnValue(true);

    service.confirm('Are you sure?').subscribe(result => {
      expect(window.confirm).toHaveBeenCalledWith('Are you sure?');
      expect(result).toBeTrue();
      done();
    });
  });

  it('resolves to false when the user cancels', (done) => {
    spyOn(window, 'confirm').and.returnValue(false);

    service.confirm('Are you sure?').subscribe(result => {
      expect(result).toBeFalse();
      done();
    });
  });

  it('falls back to a default message when none is provided', (done) => {
    spyOn(window, 'confirm').and.returnValue(true);

    service.confirm().subscribe(() => {
      expect(window.confirm).toHaveBeenCalledWith('Is it OK?');
      done();
    });
  });
});
