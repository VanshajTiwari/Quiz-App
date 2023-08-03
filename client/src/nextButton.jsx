export default function NextButton({dispatch,answer,index,length}){
    if(answer===null)return null;
    return(
        index!==length-1?<button className="next" style={{margin:"1rem"}} onClick={()=>{dispatch({type:"nextQuestion"})}}>Next</button>:<button className="next" style={{margin:"1rem"}} onClick={()=>{dispatch({type:"finished"})}}>finish</button>
        
        )
}