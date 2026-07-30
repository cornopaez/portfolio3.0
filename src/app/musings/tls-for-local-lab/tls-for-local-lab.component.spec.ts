import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { TlsForLocalLabComponent } from './tls-for-local-lab.component';
import { AcmeCommandOutputComponent } from './acme-command-output/acme-command-output.component';
import { AcmeCommandRecapComponent } from './acme-command-recap/acme-command-recap.component';
import { JupyterConfigUpdatesComponent } from './jupyter-config-updates/jupyter-config-updates.component';
import { PhJupyterlabComponent } from './ph-jupyterlab/ph-jupyterlab.component';
import { PhLighttpdComponent } from './ph-lighttpd/ph-lighttpd.component';
import { PiholeLighttpdExternalComponent } from './pihole-lighttpd-external/pihole-lighttpd-external.component';
import { PiholeLighttpdModOpensslInstallComponent } from './pihole-lighttpd-mod-openssl-install/pihole-lighttpd-mod-openssl-install.component';

describe('TlsForLocalLabComponent', () => {
  let component: TlsForLocalLabComponent;
  let fixture: ComponentFixture<TlsForLocalLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule, TlsForLocalLabComponent,
        AcmeCommandOutputComponent,
        AcmeCommandRecapComponent,
        JupyterConfigUpdatesComponent,
        PhJupyterlabComponent,
        PhLighttpdComponent,
        PiholeLighttpdExternalComponent,
        PiholeLighttpdModOpensslInstallComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TlsForLocalLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
