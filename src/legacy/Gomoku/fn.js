const checkIds_ArrInArr = (arr1=[], arr2=[]) => {
  // console.log(arr1, arr2)
  const amount = arr1.length
  let count = 0
  arr2.forEach(arr => {
    if(arr1.indexOf(arr) !== -1) {
      count += 1
    } 
  })
  return count === amount
}
//14pieces per row
export const piece8Directions = [-15, -14, -13, -1, 1, 13, 14, 15]

export const checkWhoWin = (pieceData, user='') => {
  const array5 = [...Array(5).keys()]
  const filteredPieces = pieceData.filter(data => data.user === user)
  const filteredPiecesIds = filteredPieces.map(piece => piece.pieceId)
  // console.log(filteredPiecesIds)
  const checkDirections = (pieceId) => {
    const topLeftIds = array5.map(i => pieceId - i * 15)
    const topIds = array5.map(i => pieceId - i * 14)
    const topRightIds = array5.map(i => pieceId - i * 13)
    const leftIds = array5.map(i => pieceId - i * 1)
    const rightIds = array5.map(i => pieceId + i * 1)
    const bottomLeftIds = array5.map(i => pieceId + i * 13)
    const bottomIds = array5.map(i => pieceId + i * 14)
    const bottomRightIds = array5.map(i => pieceId + i * 15)
    const directionIds = [topLeftIds, topIds, topRightIds, leftIds, rightIds, bottomLeftIds, bottomIds, bottomRightIds]
    for (let i = 0; i < directionIds.length; i++) {
      const ids = directionIds[i]
      if(checkIds_ArrInArr(ids, filteredPiecesIds)) {
        return true
      }
    }
  }
  //
  const checkIsFulfill = () => {
    if(filteredPieces.length < 5) {
      return false
    } else {
      for (let i = 0; i < filteredPiecesIds.length; i++) {
        const id = filteredPiecesIds[i]
        const res = checkDirections(id)
        if(res) {
          return true
        }
      }
    }
  }
  if(checkIsFulfill()) {
    return user
  } 
  return null
}

const userPrefix = ['tiger', 'penguin', 'cat', 'sloth']
export const getRandomUser = () => {
  const _userPrefix = [...userPrefix]
  const user1Id = ~~(Math.random() * 10000)
  const user2Id = ~~(Math.random() * 10000)
  const user1PrefixIndex = ~~(Math.random() * 4)
  const user2PrefixIndex = ~~(Math.random() * 3)
  const user1 = _userPrefix[user1PrefixIndex] + '_' + user1Id
  _userPrefix.splice(user1PrefixIndex, 1)
  const user2 = _userPrefix[user2PrefixIndex] + '_' + user2Id
  return [user1, user2]
}

export const scrollToBottom = el => {
  el && el.scrollIntoView({ behavior: 'instant', block: 'end', inline: 'end' })
}

export const randomPiece = (pieceData) => {
  const emptyPieces = pieceData.filter(data => !data.pieceColor)
  const randomIndex = ~~(Math.random() * emptyPieces.length)
  const randomPiece = emptyPieces[randomIndex]
  return randomPiece.pieceId
}

export const getIndexBetweenNums = (num=0, arr=[]) => {
  return arr.findIndex(a => a > num) - 1
}