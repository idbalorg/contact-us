import React from 'react';
import { useState } from 'react';

const Form = () => {
    const [state, setState] = useState({
        name : "",
        email : "",
        subject : "",
        message : "",
        feedback : ""

    })

    const [error, setError] = useState(false);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData =  state ;
        const res = await fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(formData)
        });
        const data = await res.json();
        console.log(data)
        if (data.id){
            setState({
                name: '',
                email: '',
                subject:'',
                message: '',
                feedback: `Thanks for the feedback, we will revert to you shortly
                kindly refresh this page for more feedbacks`
            })
            setError(false);
        } else{
            setError(true)
        } 

    };

    const handleName = (e) => {
        setState({...state, name:e.target.value})
        
    }
    const handleEmail = (e) => {
        setState({...state, email:e.target.value})
    }
    const handleSubject = (e) => {
        setState({...state, subject:e.target.value})
    }
    const handleMessage = (e) => {
        setState({...state, message:e.target.value})
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit} action="">
                <div>
                    <h2>Contact us</h2>
                    {error ?<p>Error submitting form. kindly refresh this page and try again.</p>:<h3 >{state.feedback}</h3>}
                    {/* {error && <p>Error submitting form. kindly refresh this page and try again.</p> } */}
                </div>
                <div>
                    <div>
                    <input placeholder='Your Name' onChange= {handleName}type="text" name="user" id="name" required value= {state.name}/>
                    </div>
                    <div>
                        <input placeholder='email' onChange= {handleEmail} type="email" name="email" id="email" required value={state.email} />
                    </div>
                    <div>
                        <input placeholder='subject' onChange= {handleSubject} type="text" name="subject" id="subject" value={state.subject} />
                    </div>
                    <div>
                        <input placeholder='Type your feedback here'  onChange= {handleMessage} type="text" name="message" id="message"  required value={state.message} />
                    </div>
                    <div>
                        <button type='submit' >Submit</button>
                    </div>
                    
                    
                </div>
                
            </form>
        </div>
    )

}

export default Form