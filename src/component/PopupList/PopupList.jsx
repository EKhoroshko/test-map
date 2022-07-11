import React from 'react';
import { colorWeight } from '../../helper/colors';
import './PopupList.css';

function PopupList({ onRemove, onChangeColor }) {
  return (
    <ul className="list">
      <li>
        <p>Change rating:</p>
        {Object.keys(colorWeight).map((color, index) => {
          return (
            <button
              key={index}
              className={`${color}`}
              type='button'
              onClick={() => onChangeColor(color)}
            ></button>
          )
        })}
      </li>
      <li className="listItem">
        You want remove marker ?
        <button className="removeBtn"
          type='button'
          onClick={() => onRemove()}
        >Remove</button>
      </li>
    </ul >
  )
}

export default PopupList