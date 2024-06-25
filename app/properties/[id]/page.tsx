import FavoriteToggleButton from '@/components/card/FavoriteToggleButton'
import PropertyRating from '@/components/card/PropertyRating'
import Amenities from '@/components/properties/Amenities'
import BookingCalendar from '@/components/properties/BookingCalendar'
import BreadCrumbs from '@/components/properties/BreadCrumbs'
import Description from '@/components/properties/Description'
import ImageContainer from '@/components/properties/ImageContainer'
import PropertyDetails from '@/components/properties/PropertyDetails'
import PropertyMap from '@/components/properties/PropertyMap'
import SharedButton from '@/components/properties/SharedButton'
import UserInfo from '@/components/properties/UserInfoProps'
import PropertyReviews from '@/components/reviews/PropertyReviews'
import SubmitReview from '@/components/reviews/SubmitReview'
import { Separator } from '@/components/ui/separator'
import { fetchPropertyDetail } from '@/utils/actions'
import { redirect } from 'next/navigation'
import { findExistingReview } from '@/utils/actions'
import { auth } from '@clerk/nextjs/server'

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetail({ propertyId: params.id })
  if (!property) redirect('/')
  const { baths, bedrooms, beds, guests } = property
  const details = { baths, bedrooms, beds, guests }
  const firstName = property.profile.firstName
  const profileImage = property.profile.profileImage

  const { userId } = auth()
  const isNotOwner = property.profile.clerkId !== userId
  const reviewDoesExist = userId && isNotOwner && !(await findExistingReview(userId, property.id))

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
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating propertyId={property.id} inPage={true} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <PropertyMap countryCode={property.country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalendar />
        </div>
      </section>
      <section>
        {reviewDoesExist && <SubmitReview propertyId={property.id} />}
        <PropertyReviews propertyId={property.id} />
      </section>
    </section>
  )
}
export default PropertyDetailsPage
