import React from 'react'

interface Props {
    id: string;
    name: string;
}

const DragedItem = (props: Props) => {



    return (
        <div key={props.id} className="card-container-styles px-1" >
            {props.name}
        </div>
    )
}

export default DragedItem
