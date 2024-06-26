import _ from "lodash"

export const isSelectionCorrect = (selectedItem, selectedPair) => {
  if(selectedPair.length === 2 && _.isEqual(selectedPair[0], selectedPair[1])){
    return selectedPair.some((match) => _.isEqual(match, selectedItem))
  }
  return false
}

export const removeData = (dataList, selectionToRemove) => {
  return dataList.filter((dataItem) => !_.isEqual(dataItem, selectionToRemove))
}

export const generateMessage = (score) => {
  let text
  if(score < 30){
    text = 'Better Luck next Time!'
  } else if (score >= 30 && score < 50){
    text = 'Good Job!'
  } else {
    text = 'Excellent! You\'re a geography whiz!'
  }
  return text
}
