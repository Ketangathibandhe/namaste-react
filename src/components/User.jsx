import { useState } from "react"

const User = ({name , location}) => {
    const [count] = useState(0);
    const [count2]= useState(2);
  return (
    <div className="user-card">
        <h1>count :{count}</h1>
        <h1>count :{count2}</h1>
        <h1>Developer Of The DevTinder </h1>
        <h2>Name:{name}</h2>
        <h2>Location:{location}</h2>
        <h2>Contach:+9112345664</h2>
    </div>
  )
}

export default User