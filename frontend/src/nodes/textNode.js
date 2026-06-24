// textNode.js — Part 3: auto-resize + {{variable}} handle generation
import { useState, useEffect, useRef } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { Handle } from 'reactflow';
import { COLORS } from './BaseNode';

const VAR_REGEX = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

function extractVars(text) {
  const vars = [];
  const seen = new Set();
  let m;
  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) {
    if (!seen.has(m[1])) { seen.add(m[1]); vars.push(m[1]); }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [vars, setVars] = useState(() => extractVars(data?.text || '{{input}}'));
  const updateNodeInternals = useUpdateNodeInternals();
  const taRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    const newVars = extractVars(val);
    setVars(newVars);
    updateNodeInternals(id);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = taRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const minWidth = 220;
  // Grow width based on longest line
  const longestLine = currText.split('\n').reduce((a, b) => a.length > b.length ? a : b, '');
  const estimatedWidth = Math.max(minWidth, Math.min(500, longestLine.length * 7.5 + 48));

  return (
    <div style={{
      width: estimatedWidth,
      background: COLORS.surface,
      border: `1px solid ${COLORS.bdBase}`,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,.55)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      transition: 'width .15s',
    }}>
      {/* Header */}
      <div style={{ background: COLORS.amber, padding: '6px 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em',
          textTransform: 'uppercase', color: '#fff', opacity: 0.95 }}>Text</span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px' }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.07em',
          textTransform: 'uppercase', color: COLORS.txtLo, display: 'block', marginBottom: 4 }}>
          Content
        </span>
        <textarea
          ref={taRef}
          value={currText}
          onChange={handleChange}
          rows={2}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: COLORS.input, border: `1px solid ${COLORS.bdDim}`,
            borderRadius: 6, padding: '6px 8px', fontSize: 12,
            color: COLORS.txtHi, outline: 'none', fontFamily: 'inherit',
            resize: 'none', lineHeight: 1.6, overflow: 'hidden',
            minHeight: 36,
          }}
        />
        {vars.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {vars.map(v => (
              <span key={v} style={{
                fontSize: 10, padding: '2px 7px', borderRadius: 10,
                background: COLORS.amber + '22', border: `1px solid ${COLORS.amber}55`,
                color: COLORS.amber, fontFamily: 'monospace',
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic variable handles on the left */}
      {vars.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-var-${v}`}
          style={{
            top: `${((i + 1) / (vars.length + 1)) * 100}%`,
            background: COLORS.amber,
            border: `2px solid ${COLORS.surface}`,
            width: 10, height: 10,
          }}
        />
      ))}

      {/* Static output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: COLORS.amber,
          border: `2px solid ${COLORS.surface}`,
          width: 10, height: 10,
          top: '50%',
        }}
      />
    </div>
  );
};
