import React, { useState, useEffect } from 'react'

export const ChoiceDisplay = props => {

    const orderStyle = [
        {
            order: `${props.order[0]}`
        },
        {
            order: `${props.order[1]}`
        },
        {
            order: `${props.order[2]}`
        },
        {
            order: `${props.order[3]}`
        },
    ]

    const submitAnswer = isCorrect => {
        if (isCorrect && props.isAsking) {
            props.increaseScore();
        }
        props.setIsAsking(false);
    }

    return (
        <div className="choiceDisplay">

            <button 
                className="btn"
                onClick={() => submitAnswer(true)}
                style={orderStyle[0]} >{props.correct}</button>

            <button 
                className="btn"
                onClick={() => submitAnswer(false)}
                style={orderStyle[1]} >{props.incorrect[0]}</button>

            <button 
                className="btn" 
                onClick={() => submitAnswer(false)}
                style={orderStyle[2]} >{props.incorrect[1]}</button>

            { props.incorrect.length === 3 &&
                <button 
                    className="btn"
                    onClick={() => submitAnswer(false)}
                    style={orderStyle[3]} >{props.incorrect[2]}</button>
            }
        </div>
    )
}
