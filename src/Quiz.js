import { useEffect, useState } from "react";
import ques from './questions.json';
export const Quiz = () => {
    let [curques,setcurques]=useState(0);
    let [timer,settimer]=useState(10);
    let [show,setshow]=useState(false);
    let [score,setscore]=useState(0);
    let changeques=(x)=>{
        if(ques[curques].ans===x){
            setscore((s)=>s+1);
        }
        if(curques===ques.length-1){
            setshow(true);
        }
        setcurques(curques+1);
        settimer(10);
    }
    useEffect(()=>{
        let interval;
        if(timer>0){
        interval=setInterval(()=>{
            settimer((curtime)=>curtime-1);
        },1000);
    }else{
        setshow(true);
    }
        return ()=>clearInterval(interval);}
    ,[timer])
  
    return (
        <>
        { show ? (
            <div className="container">
                <div className="scorecard">Your Score is : <b>{" "+score+"/"+ques.length}</b></div>
            </div>
        ):(
            <div className="container">
            <h1>Question No. { curques+1}{"/"+ques.length}</h1>
            <div className="question">
                {ques[curques].q}
            </div>
            <div className="options">
                {
                    ques[curques].opt.map((option,index)=>{
                        return (
                        <button key={index} onClick={()=>changeques(option)}>{option}</button>
                        )
                    })
                }
            </div>
            <div className="time">Time Remaining : <b>{timer}</b>s</div>
        </div>
        )}
            
        </>
    
  )
}
