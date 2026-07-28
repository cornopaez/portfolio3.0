import { CanDeactivateGuard, CanComponentDeactivate } from './can-deactivate-guard.service';

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;

  beforeEach(() => {
    guard = new CanDeactivateGuard();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('delegates to the component\'s canDeactivate() when it exists', () => {
    const component: CanComponentDeactivate = {
      canDeactivate: jasmine.createSpy().and.returnValue(false)
    };

    const result = guard.canDeactivate(component);

    expect(component.canDeactivate).toHaveBeenCalled();
    expect(result).toBeFalse();
  });

  it('returns true when the component has no canDeactivate() method', () => {
    const component = {} as CanComponentDeactivate;

    const result = guard.canDeactivate(component);

    expect(result).toBe(true);
  });
});
