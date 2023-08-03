export default function Progress({maxPoint,index,questions,points,answer}){
    return(
        <header className="progress">  
            <progress max={questions} value={index+Number(answer!==null)}/>
            <p>Question <strong>{index+Number(answer!==null)}</strong>/{questions}</p>
            <p><strong>{points}</strong>/{maxPoint}</p>
        </header>
    )
}