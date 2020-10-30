import React, { useState, useEffect } from 'react'

export const ChoiceDisplay = props => {

    const [order, setOrder] = useState([1,2,3,0]) // randomize this array when new question is asked

    useEffect(() => {
        return () => {
            let array = order;
        
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
    
            setOrder(array);
        }
    }, [props.correct, order])

    const orderStyle = [
        {
            order: `${order[0]}`
        },
        {
            order: `${order[1]}`
        },
        {
            order: `${order[2]}`
        },
        {
            order: `${order[3]}`
        },
    ]

    return (
        <div className="choiceDisplay">

            <button style={orderStyle[0]} >{props.correct}</button>

            <button style={orderStyle[1]} >{props.incorrect[0]}</button>

            <button style={orderStyle[2]} >{props.incorrect[1]}</button>

            <button style={orderStyle[3]} >{props.incorrect[2]}</button>
            
        </div>
    )
}
