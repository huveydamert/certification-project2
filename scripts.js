let count = 0

/**
 * Creating the increment function
 */
const increment = () => {
  count += 1
  document.getElementById('h1').textContent = count
}

/**
 * Adding the event listener
 */
document
  .getElementById('button')
  .addEventListener('click', () => increment())


