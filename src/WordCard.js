import React, {useState} from 'react';
import _, { attempt, set } from 'lodash';

import CharacterCard from './CharacterCard';


const prepareStateFromWord = given_word => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 5, //เล่นครั้งที่เท่าไหร่
        guess:'',   //คลิกไปกี่คำ
        completed: false //การเล่นจบรึยัง
    }

}

export default function WordCard(props){

    const[state, setState] = useState(prepareStateFromWord(props.value))

    const activationHandler = c => {
        console.log(`${c} has been activated`)

        let guess = state.guess + c
        setState({...state, guess})

        if(guess.length == state.word.length){
            if(guess == state.word){
                setState({...state, completed: true})
                alert(`Congrats! ${props.value}`);
                state.attempt = 5
            }else{
                console.log('reset, next attempt')
                setState({...state, guess: '',attempt: state.attempt - 1})
                if (state.attempt === 1) {
                    alert("Game over! ")
                    state.attempt = 5
                    window.location.reload();
                }

            }
        }

      
    }

    return(
        <div>
            { 
              state.chars.map((c, i) => 
                   <CharacterCard value={c} key={i} activationHandler={activationHandler} attempt = {state.attempt}/> 
                )
            }
        </div>
    )
}