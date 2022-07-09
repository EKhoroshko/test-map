import React from 'react';
import css from './PopupList.module.css';

function PopupList({ onRemove, onChangeColor }) {
  return (
    <ul className={css.list}>
      <li>
        <p>Change rating:</p>
        <button
          className={css.black}
          type='button'
          onClick={() => onChangeColor(0)}
        ></button>
        <button
          className={css.gray}
          type='button'
          onClick={() => onChangeColor(1)}
        ></button>
        <button
          className={css.red}
          type='button'
          onClick={() => onChangeColor(2)}
        ></button>
        <button
          className={css.orange}
          type='button'
          onClick={() => onChangeColor(3)}
        ></button>
        <button
          className={css.lime}
          type='button'
          onClick={() => onChangeColor(4)}
        ></button>
        <button
          className={css.green}
          type='button'
          onClick={() => onChangeColor(5)}
        ></button>
      </li>
      <li className={css.listItem}>
        You want remove marker ?
        <button className={css.removeBtn}
          type='button'
          onClick={() => onRemove()}
        >Remove</button>
      </li>
    </ul>
  )
}

export default PopupList