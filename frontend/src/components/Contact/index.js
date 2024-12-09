import './index.scss'
import { useEffect, useRef, useState } from 'react';

const Contact = () => {
    // const [letterClass, setLetterClass] = useState('text-animate');
    // const refForm = useRef();
    

    // const sendEmail = (e) => {
    //     e.preventDefault()

    //     // emailjs
    //     // .sendForm(
    //     //     'service_3miy6li',
    //     //     'template_cozfzzc',
    //     //     refForm.current,
    //     //     'rfAX1yckfaCxrl0by'
    //     // )
    //     // .then(
    //     //     (response) => {
    //     //         console.log('EmailJS Success:', response);
    //     //         alert('Message successfully sent!');
    //     //         window.location.reload(false);
    //     //     },
    //     //     (error) => {
    //     //         console.error('EmailJS Error:', error);
    //     //         alert('Failed to send message, please try again');
    //     //     }
    //     // );


    // }

    // return (
    //     <div className='container about-page'>
    //         <div className='text-zone'>
    //             <h1>
    //             </h1>
    //             <p>
    //                 I am .....  if you
    //                 Then be sure to send me a message:
    //             </p>

    //             <div className='contact-form'>
    //                 <form ref={refForm} onSubmit={sendEmail}>
    //                     <ul>
    //                         <li className='half'>
    //                             <input type='text' name='name' placeholder='Name' required/>
    //                         </li>
    //                         <li className='half'>
    //                             <input type='email' name='email' placeholder='Email' required/>
    //                         </li>
    //                         <li>
    //                             <input type='text' name='subject' placeholder='Subject' required/>
    //                         </li>
    //                         <li>
    //                             <textarea name='message' placeholder='Message' required/>
    //                         </li>
    //                         <li>
    //                             <input type='submit' className='flat-button' value={"SEND"}/>
    //                         </li>
    //                     </ul>
    //                 </form>
    //             </div>
    //         </div>

    //     </div>
    // );
}   

export default Contact;