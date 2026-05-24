import * as migration_20260516_202037_initial from './20260516_202037_initial'
import * as migration_20260517_122022_lead_magnet_subscribers from './20260517_122022_lead_magnet_subscribers'
import * as migration_20260524_083023_videos_and_video_globals from './20260524_083023_videos_and_video_globals'

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
  {
    up: migration_20260524_083023_videos_and_video_globals.up,
    down: migration_20260524_083023_videos_and_video_globals.down,
    name: '20260524_083023_videos_and_video_globals',
  },
]
