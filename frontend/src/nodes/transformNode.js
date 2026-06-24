import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeSelect, NodeInput, FieldLabel, COLORS } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  return (
    <BaseNode id={id} title="Transform" headerColor={COLORS.rose}
      handles={[
        { id: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { id: `${id}-out`, type: 'source', position: Position.Right, style: { top: '50%' } },
      ]}>
      <div>
        <FieldLabel>Operation</FieldLabel>
        <NodeSelect value={operation} onChange={e => setOperation(e.target.value)}
          options={['uppercase', 'lowercase', 'trim', 'reverse', 'base64-encode']} />
      </div>
    </BaseNode>
  );
};
