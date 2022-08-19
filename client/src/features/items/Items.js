import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchItems} from './itemsSlice';
import styles from './Counter.module.css';

export function Items() {

  useEffect(()=> {
    fetchItems()  
      }, [])

  const dispatch = useDispatch();

  const items = useSelector((state)=>state.items.items);

  console.log(items);
  
  return (
    <div>
      <h1>HEllo</h1>
      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div> */}
    </div>
  );
}
