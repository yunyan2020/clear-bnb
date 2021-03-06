import SignUp from './SignUp'
import SignIn from './SignIn'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import Radium from 'radium'


function Modal(props) {
  const { isLoggedIn } = useContext(UserContext)
  const [isShowSignUp, setIsShowSignUp] = useState(false)

  useEffect(async () => {
    if (!Array.isArray(isLoggedIn)) {
      setIsShowSignUp(false)
    }
  }, [isLoggedIn])

  const signUpForm = () => {

    setIsShowSignUp(true)
 
  }

  const closeSignUp = () => {
    setIsShowSignUp(false)
    props.closeModal()

  }

  const whenClicked = () => {

    setIsShowSignUp(false)
    props.closeModal()
  }

  return (
    <div style={modalStyle}>
      <button style={modalStyle.close} onClick={closeSignUp}>X</button>
      {isShowSignUp ? <SignUp isClicked={whenClicked} /> : <SignIn isClicked={whenClicked} />}
      {!isShowSignUp ? <button style={modalStyle.btn} key="2" onClick={signUpForm}>Sign Up</button> : ''}
    </div>
  )
}

const modalStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '10',
  btn: {
    minWidth: "100%",
    cursor: "pointer",
    marginRight: "0.25em",
    marginTop: "0.5em",
    borderRadius: "4px",
    backgroundColor: "#fefefe",
    border: "none",
    color: "#22223B",
    padding: "1.2em",
    boxShadow: "0px 8px 36px #222",
    ':hover': {
      backgroundColor: "#72A19D",
      border: "none",
      color: "#fefefe"
    },
  },
  close: {
    cursor: "pointer",
    marginRight: "0.25em",
    marginBottom: "0.5em",
    borderRadius: "4px",
    backgroundColor: "#fefefe",
    border: "none",
    color: "#22223B",
    padding: "0.8em 1em",
    boxShadow: "0px 2px 36px #222",
    textAlign: 'right',
    ':hover': {
      backgroundColor: "#72A19D",
      border: "none",
      color: "#fefefe"
    },
  }
}

export default Radium(Modal)