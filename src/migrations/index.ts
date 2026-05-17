import * as migration_20260516_202037_initial from './20260516_202037_initial'
import * as migration_20260517_122022_lead_magnet_subscribers from './20260517_122022_lead_magnet_subscribers'

export const migrations = [
  {
    up: migration_20260516_202037_initial.up,
    down: migration_20260516_202037_initial.down,
    name: '20260516_202037_initial',
  },
  {
    up: migration_20260517_122022_lead_magnet_subscribers.up,
    down: migration_20260517_122022_lead_magnet_subscribers.down,
    name: '20260517_122022_lead_magnet_subscribers',
  },
]
