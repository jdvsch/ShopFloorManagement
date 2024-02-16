import SingIn from "../../components/singIn/SingIn"

export default function LogIn() {
  const myComponentStyle = {
    backgroundImage: "url(/img/background/" + new Date().getDate() + ".jpg)",
    height:'90vh',  
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    }
  return (
    <div style={myComponentStyle}>
      <SingIn/>
    </div>
  )
}
