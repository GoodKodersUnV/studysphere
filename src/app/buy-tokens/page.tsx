import Premium from './Premium'

const page = () => {
  return (
    <Premium secret={process.env.PRO_SECRET} />
  )
}

export default page