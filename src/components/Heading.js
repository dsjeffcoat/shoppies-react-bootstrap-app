import React from 'react'

const Heading = (props) => {
    return (
        <div className='col ml-4 font-weight-bold'>
            <h1>{props.heading}</h1>
        </div>
    )
}

export default Heading

