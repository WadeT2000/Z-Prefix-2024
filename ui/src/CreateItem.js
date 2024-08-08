import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import addItem from './AddIt';
import './CreateItem.css';






export default function CreateItem() {
    const navigate = useNavigate();
    const [uName, setUname] = useState('');
    const [iName, setIname] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [uID, setUId] = useState('')



    useEffect(() => {
        fetch('http://localhost:8080/userinfo', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          setUId(data[0].id)
          setUname(data[0].username)
        })
    }, [])
    
    
    
    
    
    
    const handlealert = (msg) => {
        alert(msg)
      }


    const AddItem = async (e) => {
        e.preventDefault();
        let iNameValidation = nameformValidation(iName, `Item Name`);
        let descripValidation = decriptionformValidation(description, `Description`);
        let quantityValidation = quantityformValidation(quantity, `Quantity`);
        if (!iNameValidation && !descripValidation && !quantityValidation){
          const status = await addItem(uID, uName, iName, description, quantity);
          console.log(status)
          if(status.message !== 'Item Created') {
            alert(status.message)
          } else {
          handleResponse(status);
          }
        } else {
          let msg = '';
          if (iNameValidation){
            msg = msg.concat(iNameValidation);
          }
          if (descripValidation){
            msg = msg.concat(descripValidation);
          }
          if (quantityValidation){
            msg = msg.concat(quantityValidation);
          }
          handlealert(msg)
        }
      };

    const quantityformValidation = (input, inputType) => {
        let strRegex = new RegExp(/^[0-9]+$/i);
        let validChars = strRegex.test(input); 
        let message = '';
        if (!validChars){
          message = message.concat(`Invalid Characters in ${inputType}, only numeric characters are acceptable.\n`)
        }
        if (validChars){
          return false;
        } else {
          return message
        }
    };  

    const decriptionformValidation = (input, inputType) => { 
        let validLength =(input.length >=1) && (input.length <=300);
        let message = '';
        if (!validLength){
          message = message.concat(`Invalid Length in ${inputType}, input must be 1-300 characters.\n`)
        }
        if (validLength){
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
          navigate('/inventory')
      };



    return (
        <div>
          <div className="createnavbar">
          <button className="createcancel" onClick={() => navigate('/inventory')}>Cancel</button>
            </div>
           <div className="createItembox">
                
                <p className="createuname">Username: {uName}</p>
                <p className="createiname">Item Name:</p>
                <input type="text" className="creatinameinput" minLength="1" maxLength="30" placeholder="" value={iName} onChange={(e) => setIname(e.target.value)} required/>
                <p className="createdescription">Description:</p>
                <textarea className="createdescriptioninput" minLength="1" maxLength="500" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} required/><br/>
                <p className="createquantity">Quantity:</p>
                <input className="createquantityinput" type="number" min='1' placeholder="" value={quantity} onChange={(e) => setquantity(e.target.value)} required/><br/>
                <button className="createaddbutt" onClick={(e)=>AddItem(e)}>Add Item</button>
            </div>
        </div>
    )
}