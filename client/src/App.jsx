import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Main from './Maini'
import Error from './Error'
import Loading from './LOading'
import StartScreen from './startScreen'
import Question from './Question';
import NextButton from './nextButton'
import Progress from './progress'
import FinishScreen from './FinishScreen'
import Timer from './Timer'


const initialState={question:[],
  //'loading,error,ready,active,finished"
  status:"loading",
  answer:null,
  points:0,
  index:0,
  highScore:0,
  secondsRemaining:null,
}

function reducer(state,action){
  switch(action.type){
    case 'dataReceived':
        return{
          ...state,
          questions:action.payload,
          status:'ready'
        }
    case 'dataFailed':
      return{
        ...state,
        status:"Error"

      }
    case 'start':
      return{
        ...state,
        status:"active",
        secondsRemaining:state.questions.length*20
      }
    case 'tick':
      return{
        ...state,secondsRemaining:state.secondsRemaining-1,
        status:state.secondsRemaining<=0?'finished':state.status
      };
    case 'newanswer':
      const question=state.questions[state.index];
      return{
        ...state,
        answer:action.payload,
        points:action.payload===question.correctOption ?+state.points+Number(question.points):state.points
      }
    case 'nextQuestion':
      
      return{...state,
        index:state.index+1,
        answer:null
      }
    case "finished":
      return{
        ...state,
        status:"finished",
        highScore:state.highScore>state.points?state.highScore:state.points
        
      }
    case "restart":
      return{
        ...state,
        status:"ready",
        answer:null,
        index:0,
        points:0,
        highScore:state.highScore,
      }
    default:
      throw new Error("Action Unknown");
  }
}
export default function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  let maxPoints=250;
  // if(state.status==='ready')
  //       maxPoints=state.questions.reduce((prev,next)=>{return prev+next.points},0);
  // console.log(maxPoints);
  useEffect(function(){
   
        (async ()=>{
          try{
            const data=await (await fetch("https://quiz-server-8xoi.onrender.com")).json();
            dispatch({type:"dataReceived",payload:data.data.questions})
     //       console.log(await state);
            
 
          }
          catch(err){
            console.log(err.messsage);
              dispatch({type:"dataFailed"});
                 } } 
          
          )();
       
          },[])
   
  
  return (
    <div>
      <Header/>
      <Main>
            {state.status==='loading' && <Loading/>}
            {state.status==="ready" && <div>
                <StartScreen dispatch={dispatch} length={state.questions.length}/>
               </div>}
              {state.status==="Error" && <Error/>}
              {state.status==="finished" && <div><FinishScreen dispatch={dispatch}  Score={state.highScore} points={state.points} maxPoints={maxPoints}/>
              
              </div>}
              {state.status==="active" && <>
              <Progress points={state.points} maxPoint={maxPoints} questions={state.questions.length} index={state.index} answer={state.answer}/>
              <Question question={state.questions[state.index]} dispatch={dispatch} answer={state.answer}/>
              <Timer dispatch={dispatch} secondsRemaining={state.secondsRemaining}/>
              
              <NextButton dispatch={dispatch} answer={state.answer} length={state.questions.length} index={state.index}/>
              </>}
              
      </Main>
    </div>
  )
}
