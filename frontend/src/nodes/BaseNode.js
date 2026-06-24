// BaseNode.js — universal node abstraction
// Every node in the pipeline is built with this component.
// Props:
//   id         — ReactFlow node id
//   title      — label shown in the header
//   headerColor — accent colour for the header strip
//   handles    — array of handle descriptors
//               { id, type:'source'|'target', position, style, label }
//   children   — body content (fields, dropdowns, etc.)

import { Handle, Position } from 'reactflow';

const COLORS = {
  bg: '#07090F',
  surface: '#0D1121',
  raised: '#131929',
  input: '#090D18',
  bdDim: '#1C2540',
  bdBase: '#263050',
  txtHi: '#E4EAF6',
  txtMid: '#7A8DAE',
  txtLo: '#3D506B',
  blue: '#4B8EFF',
  emerald: '#34D39A',
  violet: '#9B79FF',
  amber: '#FFB133',
  rose: '#FF5F7E',
};

export { COLORS };

// Shared field components for use inside nodes
export function FieldLabel({ children }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.07em',
      textTransform: 'uppercase', color: COLORS.txtLo, display: 'block', marginBottom: 4 }}>
      {children}
    </span>
  );
}

export function NodeInput({ value, onChange, placeholder, style = {} }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: COLORS.input, border: `1px solid ${COLORS.bdDim}`,
        borderRadius: 6, padding: '5px 8px', fontSize: 12,
        color: COLORS.txtHi, outline: 'none', fontFamily: 'inherit',
        transition: 'border-color .15s',
        ...style,
      }}
    />
  );
}

export function NodeSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: COLORS.input, border: `1px solid ${COLORS.bdDim}`,
        borderRadius: 6, padding: '5px 8px', fontSize: 12,
        color: COLORS.txtHi, outline: 'none', fontFamily: 'inherit',
        cursor: 'pointer', appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%237A8DAE' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
      }}
    >
      {options.map(opt => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  );
}

// HANDLE LABEL: shows small text beside handles
function HandleLabel({ label, position }) {
  const isLeft = position === Position.Left;
  return (
    <span style={{
      position: 'absolute',
      fontSize: 9,
      color: COLORS.txtLo,
      [isLeft ? 'left' : 'right']: 14,
      transform: 'translateY(-50%)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>
      {label}
    </span>
  );
}

// MAIN BASE NODE
export function BaseNode({ id, title, headerColor = COLORS.blue, handles = [], children, style = {}, minWidth = 220 }) {
  return (
    <div style={{
      minWidth,
      background: COLORS.surface,
      border: `1px solid ${COLORS.bdBase}`,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,.55)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      ...style,
    }}>
      {/* Header strip */}
      <div style={{
        background: headerColor,
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em',
          textTransform: 'uppercase', color: '#fff', opacity: 0.95 }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map(h => (
        <div key={h.id} style={{ position: 'absolute', top: h.style?.top ?? '50%', 
          left: h.position === Position.Left ? 0 : 'auto',
          right: h.position === Position.Right ? 0 : 'auto' }}>
          <Handle
            type={h.type}
            position={h.position}
            id={h.id}
            style={{
              background: headerColor,
              border: `2px solid ${COLORS.surface}`,
              width: 10, height: 10,
              ...h.style,
              top: 'auto', position: 'relative',
            }}
          />
          {h.label && (
            <span style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 9,
              color: COLORS.txtLo,
              whiteSpace: 'nowrap',
              [h.position === Position.Left ? 'left' : 'right']: 14,
            }}>
              {h.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
