
const getNumber = (position: string) => {
  return Number(position.split('px')[0])
}

export {
  getNumber
}
