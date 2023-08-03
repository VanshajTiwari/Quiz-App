export default function Option({question,options,dispatch,answer}){
   const hasAsnwered=answer !==null;

    return(
        <div className="options">
        {options.map((option,index)=><button className={`btn btn-option ${index===answer?"click":""} ${hasAsnwered?index===question.correctOption?"answer":"wrong":""}`}
         key={option} onClick={()=>{dispatch({type:"newanswer",payload:index})}} disabled={answer !==null}>{option}</button>)}
        </div>
    )
}