import React, { useEffect, useRef } from 'react';
import '../styles/ticker.css';
import { CryptoState } from '../../contexts/CryptoContext';

function Ticker() {
  const { coins } = CryptoState();
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollerInner = scroller.querySelector(".scroller__inner");

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Reset the animation
        scroller.removeAttribute("data-animated");
        while (scrollerInner.firstChild) {
          scrollerInner.removeChild(scrollerInner.firstChild);
        }

        //append items
        coins.forEach((item) => {
          const symbolSpan = document.createElement('span');
          symbolSpan.textContent = item.symbol.toUpperCase();

          const arrowSpan = document.createElement('span')
          arrowSpan.innerHTML = item.price_change_percentage_24h > 0 ? '&#9650;' : '&#9660;'
          arrowSpan.id = item.price_change_percentage_24h >=0 ? 'price-up-arrow' : 'price-down-arrow'

          const percentageLi = document.createElement('li');
          percentageLi.className = item.price_change_percentage_24h > 0 ? 'price-positive-change-24h' : 'price-negative-change-24h';
          percentageLi.textContent = `${Math.abs(item.price_change_percentage_24h.toFixed(2))}%`;

          const eachCoinDetail = document.createElement('div')
          eachCoinDetail.className = 'eachCoinDetail'
          scrollerInner.appendChild(eachCoinDetail)
          eachCoinDetail.appendChild(symbolSpan)
          eachCoinDetail.appendChild(arrowSpan)
          eachCoinDetail.appendChild(percentageLi)
          
          
        });

        // Restart the animation
        requestAnimationFrame(() => {
          
          scroller.setAttribute("data-animated", true);
        });
      }
    }
  }, [coins]);

  return (
    <div className='scroller' ref={scrollerRef}>
      <ul className='tag-list scroller__inner'>

      </ul>
    </div>
  );
}

export default Ticker;
