const ShowADog = (node, window) => {
  const rnd = Math.floor(Math.random() * 5) + 1;
  const image = `/images/dogs/${rnd}.png`;

  const img = document.createElement('img');
  img.setAttribute('src', image);
  img.width = '250';
  const top = Math.floor( Math.random() * window.innerHeight );
  const left = Math.floor( Math.random() * window.innerWidth );
  const style = `top: ${top}px; left: ${left}px`; 
  img.setAttribute('style', style);
  img.alt = `Cute pup # ${rnd}`;

  node.appendChild(img);
} 

export default ShowADog