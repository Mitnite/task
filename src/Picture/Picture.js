import React from "react";
import './Picture.css';

const Picture = props => {
  const clc = ['like']
  if (props.state) {
    clc.push('liked')
  }

  return (
      <div className={'Picture'}>
        <button className={'button_delete'} onClick={props.onDelete}>x</button>
        <h2> {props.name}</h2>
        <img src={props.url} alt=''/>
        <button
            className={clc.join(' ')}
            onClick={props.onLike}
        >
        </button>

      </div>
  )
}

export default Picture

