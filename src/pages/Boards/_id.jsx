import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnDetailsAPI,
  fetchBoardDetailsAPI,
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import Box from '@mui/material/Box'
import { CircularProgress, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { mockData } from '~/apis/mock-data'

export default function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = 'board-id-01'
    // fetchBoardDetailsAPI(boardId).then(board => {

    //   board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

    //   board.columns.forEach(column => {
    //     if (isEmpty(column.cards)) {
    //       column.cards = [generatePlaceholderCard(column)]
    //       column.cardOrderIds = [generatePlaceholderCard(column)._id]
    //     } else {
    //       column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    //     }
    //   })
    //   setBoard(board)
    // })
    const board_ = mockData
    board_.columns = mapOrder(board_.columns, board_.columnOrderIds, '_id')

    board_.columns.forEach(column => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      } else {
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      }
    })
    setBoard(board_)
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)

    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }

    setBoard(newBoard)
  }

  const moveColumns = (dndOrderdColumns) => {
    const dndOrderdColumnsIds = dndOrderdColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderdColumns
    newBoard.columnOrderIds = dndOrderdColumnsIds

    setBoard(newBoard)

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderdColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderdCards, dndOrderdCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderdCards
      columnToUpdate.cardOrderIds = dndOrderdCardIds
    }

    setBoard(newBoard)

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderdCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderdColumns) => {
    const dndOrderdColumnsIds = dndOrderdColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderdColumns
    newBoard.columnOrderIds = dndOrderdColumnsIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderdColumns.find(c => c._id === prevColumnId)?.cardOrderIds || []

    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderdColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    deleteColumnDetailsAPI(columnId).then(res => {
      if (res?.status === 'ok') {
        toast.success('Delete Successfully')
      }
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}
