const casosPrueba: [number, number, ('sumar' | 'restar')][] = [
  [3, 2, 'sumar'],
  [3, 2, 'restar'],
  [5, 8, 'sumar'],
  [5, 8, 'restar'],
]

const operacion = async (num1: number, num2: number, operacion: string) => {
  const operationModule = `./operaciones.js`
  const operationImport = await import(operationModule)
  const { [operacion]: operation } = operationImport
  return new operation(num1, num2).resultado()
}

const operaciones = async (opArr: ([number, number, string])[]) => {
  for (const arr of opArr) {
    const result = await operacion(arr[0], arr[1], arr[2])
    console.log(result)
  }
}

operaciones(casosPrueba)