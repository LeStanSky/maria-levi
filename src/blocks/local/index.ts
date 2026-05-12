import type { Block } from 'payload'
import { universalBlocks } from '../universal'
import { CityHighlight } from './CityHighlight'
import { LocalLocationsList } from './LocalLocationsList'
import { NearbyAreasGrid } from './NearbyAreasGrid'
import { ServiceForCity } from './ServiceForCity'

export const localBlocks: Block[] = [
  ...universalBlocks,
  CityHighlight,
  ServiceForCity,
  LocalLocationsList,
  NearbyAreasGrid,
]
