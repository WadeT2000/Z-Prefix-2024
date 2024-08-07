import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { Dialog } from 'primereact/dialog';
import addItem from './AddIt';






export default function CreateItem() {
    const navigate = useNavigate();
    const [uName, setUname] = useState('');
    const [iName, setIname] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [manageruser, setmanageruser] = useState('')



    useEffect(() => {
        fetch('http://localhost:8080/inventory', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setmanageruser(data[0].username))
    }, [])
    
    
    
    
    
    
    const alert = (msg) => {
        setMessage(msg);
        setVisible(true);
      }


    const AddItem = async (e) => {
        e.preventDefault();
        let uNameValidation = usernameformValidation(uName, `Username`);
        let iNameValidation = nameformValidation(iName, `Item Name`);
        let descripValidation = decriptionformValidation(description, `Description`);
        let quantityValidation = quantityformValidation(quantity, `Quantity`);
        if (!uNameValidation && !iNameValidation && !descripValidation && !quantityValidation){
          const status = await addItem(uName, iName, description, quantity);
          handleResponse(status);
        } else {
          let msg = '';
          if(uNameValidation){
            msg = msg.concat(uNameValidation);
          }
          if (iNameValidation){
            msg = msg.concat(iNameValidation);
          }
          if (descripValidation){
            msg = msg.concat(descripValidation);
          }
          if (quantityValidation){
            msg = msg.concat(quantityValidation);
          }
          alert(msg)
        }
      };

    const quantityformValidation = (input, inputType) => {
        let strRegex = new RegExp(/^[0-9]+$/i);
        let validChars = strRegex.test(input); 
        let validLength =(input.length >=1) && (input.length <=3);
        let message = '';
        if (!validChars){
          message = message.concat(`Invalid Characters in ${inputType}, only numeric characters are acceptable.\n`)
        }
        if (!validLength){
          message = message.concat(`Invalid Length in ${inputType}, input must be 5-30 characters.\n`)
        }
        if (validChars && validLength){
          return false;
        } else {
          return message
        }
    };  

    const decriptionformValidation = (input, inputType) => {
        let strRegex = new RegExp(/^[a-z 0-9]+$/i);
        let validChars = strRegex.test(input); 
        let validLength =(input.length >=1) && (input.length <=300);
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
    };

    const usernameformValidation = (input, inputType) => {
        let strRegex = new RegExp(/^[a-z0-9]+$/i);
        let validChars = strRegex.test(input); 
        let validLength =(input.length >=1) && (input.length <=30);
        let validusername = (input === manageruser)
        let message = '';
        if (!validChars){
          message = message.concat(`Invalid Characters in ${inputType}, only alphanumeric characters are acceptable.\n`)
        }
        if (!validLength){
          message = message.concat(`Invalid Length in ${inputType}, input must be 5-30 characters.\n`)
        }
        if(!validusername){
            message = message.concat(`Invalid username in ${inputType}, Must be your username`)
        }
        if (validChars && validLength && validusername){
          return false;
        } else {
          return message
        }
    };

    const nameformValidation = (input, inputType) => {
        let strRegex = new RegExp(/^[a-z0-9]+$/i);
        let validChars = strRegex.test(input); 
        let validLength =(input.length >=1) && (input.length <=30);
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
    };


    const handleResponse = (res) => {
          alert(res.message)
      };



    return (
        <div>
           <div className="createItembox">
                <button className="logback" onClick={() => navigate('/inventory')}>Cancel</button><br/>
                <p>Username:</p>
                <input type="text" minLength="1" maxLength="30" placeholder="" value={uName} onChange={(e) => setUname(e.target.value)} required/>
                <p>Item Name:</p>
                <input type="text" minLength="1" maxLength="30" placeholder="" value={iName} onChange={(e) => setIname(e.target.value)} required/>
                <p>Description:</p>
                <input type="text" minLength="1" maxLength="300" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} required/><br/>
                <p>Quantity:</p>
                <input type="text" minLength="1" maxLength="3" placeholder="" value={quantity} onChange={(e) => setquantity(e.target.value)} required/><br/>
                <button className="registorbutt" onClick={(e)=>AddItem(e)}>Add Item</button>
                <Dialog header="Alert" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        {message}
                    </p>
                </Dialog>
            </div>
        </div>
    )
}