import React from 'react'
import { fetchProperties } from '@/utils/actions'
import PropertiesList from './PropertiesList'
import EmptyList from './EmtyList'
import type { PropertyCardProps } from '@/types/types'

async function PropertiesContainer({ category, search }: { category?: string; search?: string }) {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  })

  if (properties.length === 0) {
    return <EmptyList heading="No properties found" message="Try changing filters" btnText="Clear Filters" />
  }
  return <PropertiesList properties={properties} />
}

export default PropertiesContainer
