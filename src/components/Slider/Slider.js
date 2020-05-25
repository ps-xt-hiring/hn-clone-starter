import React, { useState } from 'react';
import InputBox from '../InputBox/InputBox';
import SimpleSlider from '../SimpleSlider/SimpleSlider';

export default function Slider(){
    const [ credit, setCredit] = useState(1);
    function setCreditValue(event){
        setCredit(event.target.value);
    }
    return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <InputBox credit={credit} setCreditValue={setCreditValue}/>
        <SimpleSlider credit={credit} setCreditValue={setCreditValue}/>
    </div>
}