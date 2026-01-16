
const getRandomIntInclusive = function (min : number, max : number) : number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最小值，最大值
}

export default { getRandomIntInclusive };