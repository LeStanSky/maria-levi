import * as migration_20260516_202037_initial from './20260516_202037_initial'

export const migrations = [
  {
    up: migration_20260516_202037_initial.up,
    down: migration_20260516_202037_initial.down,
    name: '20260516_202037_initial',
  },
]
