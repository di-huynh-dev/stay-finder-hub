import { Input } from '../ui/input'

function ImageInput() {
  const name = 'image'
  return (
    <div className="mb-2">
      <label htmlFor={name} className="capitalize">
        Image
      </label>
      <Input id={name} name={name} type="file" accept="image/*" className="max-w-xs" required />
    </div>
  )
}

export default ImageInput
