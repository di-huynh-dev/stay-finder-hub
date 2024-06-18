import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const createProfileAction = async (formDData: FormData) => {
  'use server'
  const fistName = formDData.get('firstName')
  console.log(fistName)
}

function CreateProfilePage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 roundedd-md max-w-lg">
        <form action={createProfileAction}>
          <div className="mb-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" name="firstName" />
          </div>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}

export default CreateProfilePage
