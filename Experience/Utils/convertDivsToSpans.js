export default function (element) {
  element.style.overflow = 'hidden'
  element.innerHTML = element.innerText.split('').map((char) => {
    if(char === ' ') {
      return `<span>${char}</span>`
    }
    return `<span class="animatethis">${char}</span>`
  })
  .join('')

  return element
}
