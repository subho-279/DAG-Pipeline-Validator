// submit.js — Part 4: Backend integration
import { useState } from 'react';
import { useStore } from './store';
import { COLORS } from './nodes/BaseNode';

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const nodes = useStore(s => s.nodes);
  const edges = useStore(s => s.edges);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const resp = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
      const data = await resp.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{
        height: 52,
        background: COLORS.surface,
        borderTop: `1px solid ${COLORS.bdDim}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        <span style={{ fontSize: 12, color: COLORS.txtLo }}>
          {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
        </span>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '7px 20px',
            borderRadius: 7,
            background: loading ? COLORS.bdBase : COLORS.blue,
            border: 'none',
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            cursor: loading ? 'default' : 'pointer',
            fontFamily: 'inherit',
            transition: 'background .15s, opacity .15s',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {loading ? 'Analysing…' : 'Submit Pipeline'}
        </button>
      </div>

      {/* Result modal */}
      {(result || error) && (
        <div
          onClick={() => { setResult(null); setError(null); }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: COLORS.surface, border: `1px solid ${COLORS.bdBase}`,
              borderRadius: 14, padding: '28px 32px', minWidth: 320, maxWidth: 420,
              boxShadow: '0 24px 60px rgba(0,0,0,.8)',
            }}
          >
            {error ? (
              <>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.rose, marginBottom: 8 }}>
                  ✕ Error
                </div>
                <div style={{ fontSize: 13, color: COLORS.txtMid, lineHeight: 1.6 }}>{error}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.txtHi, marginBottom: 20 }}>
                  Pipeline Analysis
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Stat label="Nodes" value={result.num_nodes} color={COLORS.blue} />
                  <Stat label="Edges" value={result.num_edges} color={COLORS.violet} />
                  <Stat
                    label="Valid DAG"
                    value={result.is_dag ? 'Yes' : 'No'}
                    color={result.is_dag ? COLORS.emerald : COLORS.rose}
                    sub={result.is_dag ? 'No cycles detected' : 'Cycles detected — pipeline cannot execute'}
                  />
                </div>
              </>
            )}
            <button
              onClick={() => { setResult(null); setError(null); }}
              style={{
                marginTop: 20, width: '100%', padding: '8px 0',
                background: COLORS.raised, border: `1px solid ${COLORS.bdDim}`,
                borderRadius: 7, color: COLORS.txtMid, fontSize: 13,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function Stat({ label, value, color, sub }) {
  return (
    <div style={{
      background: COLORS.raised, borderRadius: 8, padding: '12px 16px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      border: `1px solid ${COLORS.bdDim}`,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.07em',
          textTransform: 'uppercase', color: COLORS.txtLo, marginBottom: 2 }}>
          {label}
        </div>
        {sub && <div style={{ fontSize: 11, color: COLORS.txtLo, marginTop: 3 }}>{sub}</div>}
      </div>
      <span style={{ fontSize: 22, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}
