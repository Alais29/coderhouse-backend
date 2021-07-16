const http = require('http')

const server = http.createServer((req, res) => {
  const getRandNumber = (min, max) => Math.random() * (max - min) + min;
  const obj = JSON.stringify({
    id: Math.floor(getRandNumber(1, 10)),
    title: `Producto: ${Math.floor(getRandNumber(1, 10))}`,
    price: parseFloat(getRandNumber(0.00, 9999.99)).toFixed(2),
    thumbnail: `Foto ${Math.floor(getRandNumber(1, 10))}`
  })

  res.end(obj)
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`El servidor está listo en http://localhost:${PORT}/`)
})