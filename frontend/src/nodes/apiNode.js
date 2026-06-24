import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeInput, NodeSelect, FieldLabel, COLORS } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode id={id} title="API Call" headerColor="#0e7aab" minWidth={260}
      handles={[
        { id: `${id}-body`, type: 'target', position: Position.Left, style: { top: '50%' }, label: 'body' },
        { id: `${id}-response`, type: 'source', position: Position.Right, style: { top: '50%' }, label: 'response' },
      ]}>
      <div>
        <FieldLabel>Method</FieldLabel>
        <NodeSelect value={method} onChange={e => setMethod(e.target.value)}
          options={['GET', 'POST', 'PUT', 'DELETE', 'PATCH']} />
      </div>
      <div>
        <FieldLabel>URL</FieldLabel>
        <NodeInput value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
      </div>
    </BaseNode>
  );
};
