import React from 'react'
import User from './User'
import UserClass from './UserClass'
class About extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){   // use to make an API call 
    console.log("Parent component did mount ")
  }
  render(){
  return (
    <div>
      <UserClass name="Ketan" location="Nagpur"/>
    </div>
  )
}
}

export default About