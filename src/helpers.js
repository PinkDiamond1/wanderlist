export const indexOfObj = (array, block) => {
  for(var i = 0; i < array.length; i++) {
    if(block(array[i])) { return i }
  }

  return -1
}
