import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import authenticate from './Auth';
import Cookies from 'js-cookie';
import { AuthContext } from './App';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { setAuth } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  const alert = (msg) => {
    setMessage(msg);
    setVisible(true);
  }

  const login = async (e) => {
    e.preventDefault();
    let userValidation = formValidation(username, `Username`);
    let passValidation = formValidation(password, `Password`)
    if (!userValidation && !passValidation){
      const status = await authenticate('', '', username, password, 'login');
      if (checked) {
        Cookies.set('username', username);
        Cookies.set('rememberMe', 'true');
      } else {
        Cookies.remove('username');
        Cookies.set('rememberMe', 'false');
      }
      handleResponse(status);
    } else {
      let msg = '';
      if (userValidation){
        msg = msg.concat(userValidation);
      }
      if (passValidation){
        msg = msg.concat(passValidation);
      }
      alert(msg)
    }
  };

  const formValidation = (input, inputType) => {
    let strRegex = new RegExp(/^[a-z0-9]+$/i);
    let validChars = strRegex.test(input); 
    let validLength =(input.length >=5) && (input.length <=30);
    let message = '';
    if (!validChars){
      message = message.concat(`Invalid Characters in ${inputType}, only alphanumeric characters are acceptable.\n`)
    }
    if (!validLength){
      message = message.concat(`Invalid Length in ${inputType}, input must be 5-30 characters.\n`)
    }
    if (validChars && validLength){
      return false;
    } else {
      return message
    }
  }

  const handleResponse = (res) => {
    if (res.token) {
      Cookies.set('auth_token', res.token);
      setAuth(true);
      navigate('/inventory');
    } else {
      alert(res.message)
    }
  };

  useEffect(() => {
    const rememberMe = Cookies.get('rememberMe') === 'true';
    setChecked(rememberMe);
    if (rememberMe) {
      const savedUsername = Cookies.get('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

  const handleRememberMe = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <div className="loginbox">
        <p>Username:</p>
        <input type="text" minLength="5" maxLength="30" placeholder={checked&&username!=='' ? username : ""} value={username} onChange={(e) => setUsername(e.target.value)} required/><br/>
        <p>Password:</p>
        <input type="password" minLength="5" maxLength="30" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required/><br/>
        <input className='rememberMe' type="checkbox" checked={checked} onChange={handleRememberMe}/>Remember Me <br />
        <button className="Login" onClick={(e)=>login(e)}>Login</button><br/>
        <button className="Create" onClick={() => navigate('/registration')}>Create Account</button><br/>
        <button className="Guestbutt" onClick={() => navigate(`/home`)}>Guest</button>
        <Dialog header="Alert" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <p className="m-0">
            {message}
          </p>
        </Dialog>
      </div>
    </div>
  )
}