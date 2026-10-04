import * as migration_20260516_202037_initial from './20260516_202037_initial'
import * as migration_20260517_122022_lead_magnet_subscribers from './20260517_122022_lead_magnet_subscribers'
import * as migration_20260524_083023_videos_and_video_globals from './20260524_083023_videos_and_video_globals'
import * as migration_20260524_213731_tax_note_default from './20260524_213731_tax_note_default'
import * as migration_20260525_095838_r2_prefix from './20260525_095838_r2_prefix'
import * as migration_20260622_212529_personal_branding_blocks from './20260622_212529_personal_branding_blocks'
import * as migration_20261001_011628_series_features from './20261001_011628_series_features'
import * as migration_20261001_012631_hero_media_pair from './20261001_012631_hero_media_pair'
import * as migration_20261003_014850_email_field_labels from './20261003_014850_email_field_labels'
import * as migration_20261004_134804_unpublish_hide_trash from './20261004_134804_unpublish_hide_trash'
import * as migration_20261004_140118_package_hide_on_site from './20261004_140118_package_hide_on_site'

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
  {
    up: migration_20260524_213731_tax_note_default.up,
    down: migration_20260524_213731_tax_note_default.down,
    name: '20260524_213731_tax_note_default',
  },
  {
    up: migration_20260525_095838_r2_prefix.up,
    down: migration_20260525_095838_r2_prefix.down,
    name: '20260525_095838_r2_prefix',
  },
  {
    up: migration_20260622_212529_personal_branding_blocks.up,
    down: migration_20260622_212529_personal_branding_blocks.down,
    name: '20260622_212529_personal_branding_blocks',
  },
  {
    up: migration_20261001_011628_series_features.up,
    down: migration_20261001_011628_series_features.down,
    name: '20261001_011628_series_features',
  },
  {
    up: migration_20261001_012631_hero_media_pair.up,
    down: migration_20261001_012631_hero_media_pair.down,
    name: '20261001_012631_hero_media_pair',
  },
  {
    up: migration_20261003_014850_email_field_labels.up,
    down: migration_20261003_014850_email_field_labels.down,
    name: '20261003_014850_email_field_labels',
  },
  {
    up: migration_20261004_134804_unpublish_hide_trash.up,
    down: migration_20261004_134804_unpublish_hide_trash.down,
    name: '20261004_134804_unpublish_hide_trash',
  },
  {
    up: migration_20261004_140118_package_hide_on_site.up,
    down: migration_20261004_140118_package_hide_on_site.down,
    name: '20261004_140118_package_hide_on_site',
  },
]
