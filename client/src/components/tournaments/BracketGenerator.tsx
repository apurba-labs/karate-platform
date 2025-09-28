import React from 'react';

interface BracketGeneratorProps {
  divisionId?: number;
  participants?: any[];
  onBracketGenerated?: (data: any) => void;
}

const BracketGenerator: React.FC<BracketGeneratorProps> = ({
  divisionId,
  participants,
  onBracketGenerated
}) => {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h2>Hello from BracketGenerator!</h2>
      <p>Division ID: {divisionId}</p>
      <p>Participants: {participants?.length || 0}</p>
    </div>
  );
};

export default BracketGenerator;
