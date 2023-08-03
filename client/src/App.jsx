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

console.log(fetch("../src/data/questions.json").then(res=>console.log(res)));
const initialState={question:[],
  //'loading,error,ready,active,finished"
  status:"loading",
  answer:null,
  points:0,
  index:0
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
        status:"active"
      }
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
        status:"finished"

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
            const data=await (await fetch("https://quiz-mkbh.onrender.com/")).json();
            dispatch({type:"dataReceived",payload:data})
     //       console.log(await state);
            
 
          }
          catch(err){
            console.log(err.messsage);
              dispatch({type:"dataFailed"});
                 } } 
          
          )();
       
          },[])
   
          console.log(state.status);
  return (
    <div>
      <Header/>
      <Main>
            {state.status==='loading' && <Loading/>}
            {state.status==="ready" && <div>
                <StartScreen dispatch={dispatch} length={state.questions.length}/>
              </div>}
              {state.status==="Error" && <Error/>}
              {state.status==="finished" && <div><FinishScreen points={state.points} maxPoints={maxPoints}/></div>}
              {state.status==="active" && <>
              <Progress points={state.points} maxPoint={maxPoints} questions={state.questions.length} index={state.index} answer={state.answer}/>
              <Question question={state.questions[state.index]} dispatch={dispatch} answer={state.answer}/>
              <NextButton dispatch={dispatch} answer={state.answer} length={state.questions.length} index={state.index}/>
              </>}
              
      </Main>
    </div>
  )
}
