import { DashZone } from './dashzone';

export const DashBoard = ({x, y}) => {
  const zones = [];

  for (let i = 0; i< x; i++) {
    for (let j = 0; j< y; j++) {
      zones.push(
        <DashZone key={`${i}x${j}`} x={i} y={j} /> 
      );
    }
  }

  return <>{zones}</>;
}