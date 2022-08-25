import { TeamSquad } from "../../components/team/squad";
import { TeamAccordion } from "../../components/team/accordion";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

const composition = {
  design: 1, 
  product: 1,
  tech: 6
}

const fullData = {
  product: 1, 
  data: 7
}

export const SquadManager = () => {
  const [squad, setSquad] = useState({
    design: [],
    product: [],
    tech: [],
    data: []
  });
  const [observers, setObservers] = useState([]);

  const observe = (o) => {
    const _observers = observers;

    _observers.push(o);

    emitChange();
    setObservers(_observers);
  }

  const addToSquad = (id, type) => {
    const _squad = squad;

    _squad[type].push(id);
    
    setSquad(_squad);
    emitChange();
  }

  const canAddToSquad = (id, type) => {
    return squad[type].length + 1 <= composition[type];
  }

  const emitChange = () => {
    const _squad = squad;

    observers.forEach((observer) => observer(_squad));
  }
}

export const TeamSquads = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='squad-overview'>
        <div className="squad-list">
          <TeamSquad 
            composition={composition}
            className='wrapped-card' 
            >
          </TeamSquad>
          <TeamSquad  
            composition={composition}
            className='wrapped-card'
            >
          </TeamSquad>
          <TeamSquad 
            composition={composition} 
            className='wrapped-card'
            >
          </TeamSquad>
          <TeamSquad
            composition={composition}
            className='wrapped-card'>
          </TeamSquad>
          <TeamSquad
            composition={fullData}
            className='wrapped-card'>
          </TeamSquad>
        </div>
          
        <aside className='wrapped-card'>
          <h4>Eligible members</h4>
          <TeamAccordion />
        </aside>
      </div>
    </DndProvider>
  )
}