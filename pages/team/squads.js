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

export const SquadManager = () => {
  const [squad, setSquad] = useState({
    design: [],
    product: [],
    tech: []
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
      <div
        className='overview' 
        style={styles.overview}>
        <div className="squadzone" style={styles.squadzone}>
          <TeamSquad 
            composition={composition}
            className='wrapped-card' 
            style={{
              gridColumn: 1,
              gridRow: 1
            }}>
          </TeamSquad>
          <TeamSquad  
            composition={composition}
            className='wrapped-card'
            style={{
              gridColumn: 2,
              gridRow: 1
            }}>
            

          </TeamSquad>
          <TeamSquad 
            composition={composition} 
            className='wrapped-card'
            style={{
              gridColumn: 1,
              gridRow: 2
            }}>

          </TeamSquad>
          <TeamSquad
            composition={composition}
            className='wrapped-card' 
            style={{
              gridColumn: 2,
              gridRow: 2
            }}>
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

const styles = {
  overview: {
    display: 'flex',
    height: '100%',
    gap: '16px'
  }, 
  squadzone: {
    display: 'grid',
    flex: 3,
    gap: '16px'
  }
}
