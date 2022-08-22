import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card } from '../dashcard';
import team from '../../public/team.json';

export const TeamMember = ({id, type, children}) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'teammember',
      item: { id, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, type],
  )

  return (
    <div
      className='team-member'
      ref={drag}
      role='TeamMember'
    >
      <Card isDragging={isDragging}>
        {children}
      </Card>
    </div>
  )
};


export const TeamAccordion = () => {
  const [expandedType, setExpandedType] = useState('');
  // Fetch all tech team members
  const teamPanel = {
    data: [],
    design: [],
    product: [],
    tech: []
  };

  team.forEach((member) => {
    teamPanel[member.type].push(
      <TeamMember id={member.name} type={member.type}>
        <p>{member.name}</p>
      </TeamMember>
    );
  });

  const expandType = (type) => {
    setExpandedType(type);
  }

  return (
    <table className='accordion'>
      {
        Object.keys(teamPanel).map((type) => (
          <tr key={type}>
            <thead 
              onClick={() => expandType(type)}
              className={`accordion-toggle ${type===expandedType?'expanded':''}`}
              >
              {type}
            </thead>
            <tbody
              className={`accordion-body ${type===expandedType?'expanded':''}`}
            >
              {teamPanel[type]}
            </tbody>
          </tr>
        ))
      }
    </table>
  );
}