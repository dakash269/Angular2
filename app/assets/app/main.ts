import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { AppModule1 } from './app.module1';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
platform.bootstrapModule(AppModule1);
