import { useState } from 'react';
import { BaseNode, FieldLabel, COLORS } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode id={id} title="Note" headerColor="#374151" handles={[]} minWidth={200}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={3}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: '#1a1f2e', border: `1px solid ${COLORS.bdDim}`,
          borderRadius: 6, padding: '6px 8px', fontSize: 12,
          color: COLORS.txtMid, outline: 'none', fontFamily: 'inherit',
          resize: 'none', lineHeight: 1.6, fontStyle: 'italic',
        }}
      />
    </BaseNode>
  );
};
