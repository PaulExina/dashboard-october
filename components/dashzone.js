import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DashCard } from './dashcard';

const initGrid = (x, y) => {
  const cards = [];

  for (let i = 0; i< x; i++) {
    for (let j = 0; j< y; j++) {
      cards.push({
        id: `${i} x ${j}`,
        top: i === 0 ? 0 : i*124,
        left: j === 0 ? 0 : j*198,
        title: i + j,
        i, 
        j
      })
    }
  }

  return cards;
}

//Container
export const DashZone = (props) => {
  const { x, y } = props;
  const [boxes, setBoxes] = useState(initGrid(4, 4));

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        boxes.map((box) => {
          if (box.id === id) {
            box.left = left;
            box.top = top;
          }

          return box;
        }),
      )
    },
    [boxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'dashcard',
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox],
  )

  return (
    <div 
      ref={drop}
      className='dash-zone'
    >
      {x} x {y}
      <DashCard />
      <Modal />
    </div>
  )
}