import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
    service = new ThemeService('browser');
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentTheme', () => {
    it('returns the explicit data-theme attribute when one is set', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      expect(service.getCurrentTheme()).toBe('dark');
    });

    it('falls back to prefers-color-scheme when no explicit attribute is set', () => {
      spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
      expect(service.getCurrentTheme()).toBe('dark');

      (window.matchMedia as jasmine.Spy).and.returnValue({ matches: false } as MediaQueryList);
      expect(service.getCurrentTheme()).toBe('light');
    });
  });

  describe('toggle', () => {
    it('flips light to dark, sets the attribute, and persists the choice', () => {
      document.documentElement.setAttribute('data-theme', 'light');

      const result = service.toggle();

      expect(result).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('flips dark to light', () => {
      document.documentElement.setAttribute('data-theme', 'dark');

      const result = service.toggle();

      expect(result).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  describe('on the server (SSR)', () => {
    it('always reports light without touching the DOM or localStorage', () => {
      const serverService = new ThemeService('server');
      expect(serverService.getCurrentTheme()).toBe('light');
    });
  });
});
