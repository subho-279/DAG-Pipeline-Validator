// toolbar.js
import { DraggableNode } from './draggableNode';
import { COLORS } from './nodes/BaseNode';

const NODE_DEFS = [
  { type: 'customInput', label: 'Input',     color: COLORS.blue,    icon: '→' },
  { type: 'llm',         label: 'LLM',       color: COLORS.violet,  icon: '⬡' },
  { type: 'customOutput',label: 'Output',    color: COLORS.emerald, icon: '←' },
  { type: 'text',        label: 'Text',      color: COLORS.amber,   icon: '✎' },
  { type: 'transform',   label: 'Transform', color: COLORS.rose,    icon: '⇄' },
  { type: 'filter',      label: 'Filter',    color: '#e04499',      icon: '⋯' },
  { type: 'api',         label: 'API Call',  color: '#0e7aab',      icon: '⊞' },
  { type: 'condition',   label: 'Condition', color: '#b45309',      icon: '⊕' },
  { type: 'note',        label: 'Note',      color: '#374151',      icon: '□' },
];

export const PipelineToolbar = () => {
  return (
    <div style={{
      background: COLORS.surface,
      borderBottom: `1px solid ${COLORS.bdDim}`,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      height: 56,
      gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 18, color: COLORS.blue }}>⬡</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.txtHi,
          fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          VectorShift
        </span>
      </div>

      <div style={{ width: 1, height: 28, background: COLORS.bdDim }} />

      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 6, overflowX: 'auto' }}>
        {NODE_DEFS.map(n => (
          <DraggableNode key={n.type} type={n.type} label={n.label} color={n.color} icon={n.icon} />
        ))}
      </div>
    </div>
  );
};
