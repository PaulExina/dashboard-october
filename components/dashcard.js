import { useDrag } from 'react-dnd';

export function Card({ children }) {
  return (
    <div 
      className="wrapped-card"
    >
      {children}
    </div>
  );
}

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export const DashCard = (props) => {
  const { id, left, top, children } = props;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'dashcard',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

  return (
    <div
      className='dash-card'
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role='DashCard'
    >
      <Card isDragging={isDragging}>
        {children}
      </Card>
    </div>
  )
};

