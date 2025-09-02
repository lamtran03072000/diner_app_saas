import { Outlet } from 'react-router-dom'

const AuthTemplate = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'><Outlet></Outlet></div>
  )
}

export default AuthTemplate