const showWords = (text, time = 1000, numOfwords = 0) => {
  const splitText = text.split(' ')
  let counter = 0

  return new Promise((res, rej) => {
    const timer = setInterval(() => {
      if (splitText[counter]) {
        console.log(splitText[counter]);
        counter++;
        numOfwords++;
      } else {
        clearInterval(timer);
        res(numOfwords);
      }
    }, time)
  })
}

showWords('this is a test sentence')
  .then((numOfwords) => showWords('the second sentence', 2000, numOfwords))
  .then((numOfwords) => showWords('a final sentence', 3000, numOfwords))
  .then((numOfwords) => console.log('proceso completo', numOfwords + ' palabras en total'))