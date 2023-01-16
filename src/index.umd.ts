import { registry } from 'chart.js';
import { FunnelController } from './controllers';
import { TrapezoidElement } from './elements';

export * from '.';

registry.addControllers(FunnelController);
registry.addElements(TrapezoidElement);
