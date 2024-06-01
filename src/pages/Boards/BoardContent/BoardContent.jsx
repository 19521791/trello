import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  DragOverlay,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor, 
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderdColumns, setOrderdColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderdColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderdColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderdColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // if (activeColumn._id !== overColumn._id) {

      // } else {

      // }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderdColumns.findIndex(obj => obj._id === active.id)

        const newColumnIndex = orderdColumns.findIndex(obj => obj._id === over.id)

        const dndOrderdColumns = arrayMove(orderdColumns, oldColumnIndex, newColumnIndex)

        // const dndOrderdColumnsIds = dndOrderdColumns.map(obj => obj._id)

        setOrderdColumns(dndOrderdColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customdropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns
          columns={orderdColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customdropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent