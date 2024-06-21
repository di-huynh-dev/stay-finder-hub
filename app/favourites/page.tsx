import EmptyList from '@/components/home/EmtyList'
import PropertiesList from '@/components/home/PropertiesList'
import { fetchFavorites } from '@/utils/actions'

async function FavoritesPage() {
  const favorites = await fetchFavorites()

  if (favorites.length === 0) {
    return <EmptyList />
  }

  return (
    <>
      <h2 className="text-xl font-semibold">Favorite Properties List</h2>
      <PropertiesList properties={favorites} />
    </>
  )
}
export default FavoritesPage
