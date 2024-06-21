import FavoriteToggleButton from '@/components/card/FavoriteToggleButton'
import BreadCrumbs from '@/components/properties/BreadCrumbs'
import SharedButton from '@/components/properties/SharedButton'
import { fetchPropertyDetail } from '@/utils/actions'
import { redirect } from 'next/navigation'

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetail({ propertyId: params.id })
  if (!property) redirect('/')
  const { baths, bedrooms, beds, guests } = property
  const details = { baths, bedrooms, beds, guests }
  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <div className="flex items-center gap-x-4">
          <SharedButton propertyId={property.id} name={property.name} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
    </section>
  )
}
export default PropertyDetailsPage
