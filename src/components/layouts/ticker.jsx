import React from 'react'
import '../styles/ticker.css'
import { CryptoState } from '../../contexts/CryptoContext';

function ticker() {

  const { coins, loading } = CryptoState();

  const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}


  return (
    <div className='scroller'>
      <ul className='tag-list scroller__inner'>
      {coins.map((item) => (
        <>
          <span>{item.symbol.toUpperCase()}</span>
          <li className={item.price_change_percentage_24h > 0 ? 'price-positive-change-24h' : 'price-negative-change-24h'}>
            {(item.price_change_percentage_24h).toFixed(2)}%
          </li>
        </>
      ))}
      </ul>
    </div>
  )
}

export default ticker

