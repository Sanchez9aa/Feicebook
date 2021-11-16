import './rightbar.css'
import ProfileRigthbar from '../profileRigthbar/ProfileRigthbar'
import HomeRigthbar from '../homeRigthbar/homeRigthbar'

const Rigthbar = ({user}) =>  {
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {
          user ? <ProfileRigthbar user={user}/> : <HomeRigthbar />
        }
      </div>
    </div>
  )
}

export default Rigthbar
