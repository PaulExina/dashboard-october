import { TeamSquad } from "../../components/team/squad";

const composition = {
  design: 1, 
  product: 1,
  tech: 6
}

export const TeamSquads = () => {
  return <div className='overview' style={styles.overview}>
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
      insert team accordion here
      reduced opacity on already placed collaborators
    </aside>
  </div>
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
