import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false)
  const [password, setpassword] = useState('')
  const ref = useRef(null)

  const PasswordGeneretor = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (number) str += '1234567890'
    if (char) str += '~!@#$%^&*()_+-[]{}'

    for (let i = 0; i <= length; i++) {
      let num = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(num)
    }

    setpassword(pass)
  },[length,number,char,setpassword])

  // const [length,setlength] = useState(8)
  // const [number,setnumber] = useState(false)
  // const [char,setchar] = useState(false)
  // const [password,setpassword] = useState('')

  // const PasswordGeneretor = useCallback(() => {
  //   let pass = ''
  //   let str = 'abcdefghijklmnopqrstuvwxyz'
  //   if(number) str += '1234567890'
  //   if(char) str += '!@#$%^&*()'
  //   for (let i = 0; i <= length; i++) {
  //     let num = Math.floor(Math.random() * str.length + 1)
  //      pass += str.charAt(num) 
  //   }
  //   setpassword(pass)
  // },[length,number,char,setpassword])

  const copytoclipboard = useCallback(() => {
    ref.current?.select()
    ref.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    PasswordGeneretor()
  },[length,number,char,PasswordGeneretor])

  return (
    <div className='bg-black'>
      <h1 className='text-white text-center text-2xl '>PasswordGeneretor</h1>
    <div className='flex justify-center'>
      <input 
      type="text"
      value={password}
      className='w-2/4 px-2 py-2 text-black outline-none'
      readOnly
      ref={ref} />
      <button onClick={copytoclipboard}
       className='bg-blue-200 rounded px-5 py-2'>COPY</button>
    </div>
    <div className='flex justify-center'>
      <input 
      type="range" 
      min={6}
      max={100}
      value={length}
      onChange={(a) => {setlength(a.target.value)}}
      />
      <label className='text-orange-200 px-3'>Length: {length}</label>
      <input 
      type="checkbox"
      defaultChecked={number}
      onChange={() => {setnumber((e) => !e)}}
       />
       <label className='text-white px-3'>Number</label>
      <input 
      type="checkbox"
      defaultChecked={char}
      onChange={() => {setchar((e) => !e)}}
       />
       <label className='text-white px-3'>Character</label>
       
    </div>
    </div>
  )
}

export default App
