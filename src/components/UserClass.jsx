import React from "react";
class UserClass extends React.Component {
  //class based component
  constructor(props){
    super(props)
    this.state={
      userInfo:{
        name:"Dummy",
        location:"Default",
      },
    }
  }
  async componentDidMount(){
    const data = await fetch("https://api.github.com/users/ketangathibandhe");
    const json = await data.json()
    this.setState({
      userInfo:json
    })

  }

  componentDidUpdate(){
    console.log("called after componentDidMount")
  }
  render() {

    const {name , location ,avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <h1>Developer Of The DevTinder </h1>
        <br />
        <img className="avatar-image" src={avatar_url} alt="" />
        <h2>Name:{name}</h2>
        <h2>Location:{location}</h2>
        <h2>Contach:+9112345664</h2>
      </div>
    );
  }
}

export default UserClass
