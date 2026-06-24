// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeInput, NodeSelect, FieldLabel, COLORS } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      headerColor={COLORS.emerald}
      handles={[
        { id: `${id}-value`, type: 'target', position: Position.Left, style: { top: '50%' } }
      ]}
    >
      <div>
        <FieldLabel>Name</FieldLabel>
        <NodeInput value={currName} onChange={e => setCurrName(e.target.value)} placeholder="output_name" />
      </div>
      <div>
        <FieldLabel>Type</FieldLabel>
        <NodeSelect value={outputType} onChange={e => setOutputType(e.target.value)}
          options={[{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }]} />
      </div>
    </BaseNode>
  );
};
