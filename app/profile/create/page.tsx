import SubmitButton from '@/components/form/SubmitButton'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import { createProfileAction } from '@/utils/actions'

function CreateProfilePage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 roundedd-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput name="firstName" type="text" label="First Name" placeholder="John" />
            <FormInput name="lastName" type="text" label="Last Name" placeholder="Doe" />
            <FormInput name="username" type="text" label="Username" placeholder="johndoe123" />
            <FormInput name="phone" type="text" label="phone" placeholder="0123456789" />
          </div>
          <SubmitButton text="Create Profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProfilePage
