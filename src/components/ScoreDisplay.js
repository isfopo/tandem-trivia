import React from 'react'

export const ScoreDisplay = props => {
    return (
        <div className={props.showFinal ? "finalScoreDisplay" : "scoreDisplay" }>
            { !props.showFinal &&
                <h2>Your score:</h2>
            }
            <h1>{props.score}</h1>
        </div>
    )
}
