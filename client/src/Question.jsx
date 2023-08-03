import Option from "./Options";

export default function Question({question,dispatch,answer}){
   return(<div>
        <h4>{question.question}</h4>  
        <Option options={question.options} question={question} dispatch={dispatch} answer={answer}/>
        </div>)
}