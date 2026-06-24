import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeInput, NodeSelect, FieldLabel, COLORS } from './BaseNode';

const ROSE2 = '#e04499';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode id={id} title="Filter" headerColor={ROSE2}
      handles={[
        { id: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { id: `${id}-pass`, type: 'source', position: Position.Right, style: { top: '35%' }, label: 'pass' },
        { id: `${id}-fail`, type: 'source', position: Position.Right, style: { top: '65%' }, label: 'fail' },
      ]}>
      <div>
        <FieldLabel>Field</FieldLabel>
        <NodeInput value={field} onChange={e => setField(e.target.value)} placeholder="field_name" />
      </div>
      <div>
        <FieldLabel>Operator</FieldLabel>
        <NodeSelect value={operator} onChange={e => setOperator(e.target.value)}
          options={['contains', 'equals', 'starts with', 'ends with', 'is empty']} />
      </div>
      <div>
        <FieldLabel>Value</FieldLabel>
        <NodeInput value={value} onChange={e => setValue(e.target.value)} placeholder="match value" />
      </div>
    </BaseNode>
  );
};
