// llmNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeSelect, FieldLabel, COLORS } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temp, setTemp] = useState(data?.temperature || '0.7');

  return (
    <BaseNode
      id={id}
      title="LLM"
      headerColor={COLORS.violet}
      handles={[
        { id: `${id}-system`, type: 'target', position: Position.Left, style: { top: '33%' }, label: 'system' },
        { id: `${id}-prompt`, type: 'target', position: Position.Left, style: { top: '67%' }, label: 'prompt' },
        { id: `${id}-response`, type: 'source', position: Position.Right, style: { top: '50%' }, label: 'response' },
      ]}
    >
      <div>
        <FieldLabel>Model</FieldLabel>
        <NodeSelect value={model} onChange={e => setModel(e.target.value)}
          options={['gpt-4o', 'gpt-4o-mini', 'claude-3-5-sonnet', 'claude-3-haiku']} />
      </div>
      <div>
        <FieldLabel>Temperature</FieldLabel>
        <input type="range" min="0" max="1" step="0.1" value={temp}
          onChange={e => setTemp(e.target.value)}
          style={{ width: '100%', accentColor: COLORS.violet }} />
        <span style={{ fontSize: 11, color: COLORS.txtMid }}>{temp}</span>
      </div>
    </BaseNode>
  );
};
