import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeInput, NodeSelect, FieldLabel, COLORS } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [left, setLeft] = useState(data?.left || '');
  const [op, setOp] = useState(data?.op || '==');
  const [right, setRight] = useState(data?.right || '');

  return (
    <BaseNode id={id} title="Condition" headerColor="#b45309"
      handles={[
        { id: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { id: `${id}-true`, type: 'source', position: Position.Right, style: { top: '35%' }, label: 'true' },
        { id: `${id}-false`, type: 'source', position: Position.Right, style: { top: '65%' }, label: 'false' },
      ]}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <FieldLabel>Left</FieldLabel>
          <NodeInput value={left} onChange={e => setLeft(e.target.value)} placeholder="a" />
        </div>
        <div style={{ width: 52 }}>
          <FieldLabel>Op</FieldLabel>
          <NodeSelect value={op} onChange={e => setOp(e.target.value)}
            options={['==', '!=', '>', '<', '>=', '<=']} />
        </div>
        <div style={{ flex: 1 }}>
          <FieldLabel>Right</FieldLabel>
          <NodeInput value={right} onChange={e => setRight(e.target.value)} placeholder="b" />
        </div>
      </div>
    </BaseNode>
  );
};
