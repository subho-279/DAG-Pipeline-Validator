// draggableNode.js
import { COLORS } from './nodes/BaseNode';

export const DraggableNode = ({ type, label, color, icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={e => onDragStart(e, type)}
      onDragEnd={e => { e.target.style.opacity = '1'; }}
      onDragStartCapture={e => { e.target.style.opacity = '0.7'; }}
      draggable
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 10px',
        borderRadius: 6,
        background: COLORS.raised,
        border: `1px solid ${COLORS.bdDim}`,
        cursor: 'grab',
        userSelect: 'none',
        transition: 'border-color .15s, background .15s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color || COLORS.bdBase;
        e.currentTarget.style.background = COLORS.node || '#111826';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = COLORS.bdDim;
        e.currentTarget.style.background = COLORS.raised;
      }}
    >
      {icon && <span style={{ fontSize: 13, color: color }}>{icon}</span>}
      <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.txtMid,
        fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {label}
      </span>
    </div>
  );
};
