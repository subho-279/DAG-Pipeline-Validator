// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
} from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { ApiNode } from './nodes/apiNode';
import { ConditionNode } from './nodes/conditionNode';
import { NoteNode } from './nodes/noteNode';
import { COLORS } from './nodes/BaseNode';

import 'reactflow/dist/style.css';

const GRID = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  api: ApiNode,
  condition: ConditionNode,
  note: NoteNode,
};

// Defined outside component — stable reference, prevents Zustand infinite loop
const selectNodes         = (s) => s.nodes;
const selectEdges         = (s) => s.edges;
const selectGetNodeID     = (s) => s.getNodeID;
const selectAddNode       = (s) => s.addNode;
const selectOnNodesChange = (s) => s.onNodesChange;
const selectOnEdgesChange = (s) => s.onEdgesChange;
const selectOnConnect     = (s) => s.onConnect;

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: COLORS.bdBase,
    strokeWidth: 1.5,
  },
};

export const PipelineUI = () => {
  const nodes         = useStore(selectNodes);
  const edges         = useStore(selectEdges);
  const getNodeID     = useStore(selectGetNodeID);
  const addNode       = useStore(selectAddNode);
  const onNodesChange = useStore(selectOnNodesChange);
  const onEdgesChange = useStore(selectOnEdgesChange);
  const onConnect     = useStore(selectOnConnect);

  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if (!rfInstance || !reactFlowWrapper.current) return;

    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const raw = event.dataTransfer.getData('application/reactflow');
    if (!raw) return;

    const { nodeType: type } = JSON.parse(raw);
    if (!type) return;

    const position = rfInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const nodeID = getNodeID(type);
    addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
  }, [rfInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: '100%',
        height: 'calc(100vh - 56px - 52px)',
        background: COLORS.bg,
        position: 'relative',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[GRID, GRID]}
        snapToGrid
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: COLORS.blue, strokeWidth: 1.5 }}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        style={{ background: COLORS.bg }}
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Shift"
      >
        {/* Cross-hatch grid — more refined than dots */}
        <Background
          variant={BackgroundVariant.Cross}
          color={COLORS.bdDim}
          gap={GRID}
          size={1}
        />

        {/* Controls — styled to match dark theme */}
        <Controls
          showInteractive={false}
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.bdDim}`,
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        />

        {/* Minimap */}
        <MiniMap
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.bdDim}`,
            borderRadius: 10,
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
          nodeColor={(node) => {
            const colorMap = {
              customInput:  COLORS.blue,
              llm:          COLORS.violet,
              customOutput: COLORS.emerald,
              text:         COLORS.amber,
              transform:    COLORS.rose,
            };
            return colorMap[node.type] || COLORS.raised;
          }}
          maskColor={COLORS.bg + 'bb'}
          nodeStrokeWidth={0}
        />

        {/* Empty state hint — disappears once nodes are added */}
        {nodes.length === 0 && (
          <Panel position="top-center">
            <div style={{
              marginTop: '30vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                border: `2px dashed ${COLORS.bdBase}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, color: COLORS.txtLo,
              }}>
                +
              </div>
              <span style={{
                fontSize: 14, color: COLORS.txtLo,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                Drag a node from the toolbar to get started
              </span>
              <span style={{
                fontSize: 11, color: COLORS.txtLo,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                opacity: 0.6,
              }}>
                Connect nodes by dragging from a handle · Delete with ⌦
              </span>
            </div>
          </Panel>
        )}

        {/* Keyboard hint badge */}
        <Panel position="bottom-left">
          <div style={{
            fontSize: 10,
            color: COLORS.txtLo,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            padding: '4px 8px',
            background: COLORS.surface,
            border: `1px solid ${COLORS.bdDim}`,
            borderRadius: 6,
            marginBottom: 8,
            marginLeft: 8,
          }}>
            Shift + drag to multi-select · Scroll to zoom
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};