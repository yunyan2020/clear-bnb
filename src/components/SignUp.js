import Radium from 'radium'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'

function SignUp(props) {
  const { isLoggedIn, addUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [badCredentials, setBadCredentials] = useState(false)

  useEffect(() => {
    if (isLoggedIn.error === 'Email already in use') {
    
      setBadCredentials(true)
    }
  }, [isLoggedIn])

  const handleSubmit = async e => {
  


    e.preventDefault()


    const newUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }
  
    await addUser(newUser)


    // CHECK IF EMAIL IS OK 

    if (badCredentials) {
   
      props.isClicked()
    }
  }
  const matchPass = () => {
    if (!password2 || !password || password !== password2)
      return true
    else
      return false
  }
  const matchPass2 = () => {
    if (password2 > 1 && matchPass())
      return true
    else
      return false
  }


  return (
    <div>
      <form onSubmit={handleSubmit} style={modalStyle.form}>
        <h1>Sign up</h1>
        <label style={modalStyle.label} key="1">
          Firstname
          <input
            required
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={modalStyle.input} key="2">
          </input>
        </label>
        <label style={modalStyle.label} key="3">
          Lastname
          <input
            required
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={modalStyle.input} key="4">
          </input>
        </label>
        <label style={modalStyle.label} key="5">
          Email:
          <input
            required
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={modalStyle.input} key="6">
          </input>
        </label>
        <label style={modalStyle.label} key="7">
          Password
          <input
            required
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={modalStyle.input} key="8">
          </input>
        </label>
        <label style={modalStyle.label} key="9">
          Re-enter Password
          <input
            required
            name="password"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            style={modalStyle.input} key="10">
          </input>
        </label>
        <h5 style={matchPass2() ? { color: 'red', textAlign: 'center' } : { display: 'none' }}> Passwords don't match</h5>

        {badCredentials ? <a>Email already in use</a> : ''}
        <button style={{ ...modalStyle.button, ...modalStyle.btnIn }} disabled={matchPass()} key="11">Create account</button>

      </form>
    </div>

  )
}

export default Radium(SignUp)

const modalStyle = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    minWidth: "100px",
    minHeight: "400px",
    padding: "20px 40px 40px 40px",
    borderRadius: "6px",
    boxShadow: "0px 8px 36px #222",
    backgroundColor: "#fefefe",
  },
  label: {
    marginBottom: "0.5em",
    color: "#444",
    fontWeight: "lighter",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
    width: "100%",
    padding: "10px 10px",
    borderRadius: "5px",
    border: "1px solid #d6d1d5",
    marginTop: "5px",
  },
  button: {
    minWidth: "100%",
    cursor: "pointer",
    marginRight: "0.25em",
    marginTop: "0.5em",
    borderRadius: "4px",
    transition: 'all 0.3s ease-in-out',
    ':hover': {
      backgroundColor: "#047361",
      border: "none",
      color: "#fefefe",
      transform: 'scale(1.05)'
    }
  },
  btnIn: {
    backgroundColor: "#005751",
    border: "none",
    color: "#fefefe",
    padding: "1.2em",
  },
  btnUp: {
    border: "solid #22223B 2px",
    backgroundColor: "white",
    color: "#22223B",
    padding: "0.938em",
  },
}
