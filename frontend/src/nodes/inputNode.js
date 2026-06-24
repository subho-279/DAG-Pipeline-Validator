// inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeInput, NodeSelect, FieldLabel, COLORS } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      headerColor={COLORS.blue}
      handles={[
        { id: `${id}-value`, type: 'source', position: Position.Right, style: { top: '50%' } }
      ]}
    >
      <div>
        <FieldLabel>Name</FieldLabel>
        <NodeInput value={currName} onChange={e => setCurrName(e.target.value)} placeholder="input_name" />
      </div>
      <div>
        <FieldLabel>Type</FieldLabel>
        <NodeSelect value={inputType} onChange={e => setInputType(e.target.value)}
          options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }]} />
      </div>
    </BaseNode>
  );
};
