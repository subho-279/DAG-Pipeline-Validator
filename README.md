# PIPELINE VISUALIZER

A visual AI pipeline builder. Drag, connect, and validate nodes on an infinite canvas — then submit the graph to a backend that checks whether it forms a valid DAG.

---

## What I Built

This was a full-stack take-home where I started from a bare scaffold and built everything out end-to-end.

**Frontend (React + ReactFlow + Zustand)**

The most interesting architectural decision was the `BaseNode` abstraction. Rather than copy-pasting layout and handle logic into every node type, I built a single composable component that accepts a `handles` array and `children` for the body. Adding a new node type is now just a few lines of config — the structure, dark design system, and handle rendering come for free.

The `TextNode` does something extra: it parses its text content for `{{variable}}` patterns in real time and dynamically adds/removes input handles as variables are created or deleted. That required careful Zustand state management to avoid an infinite re-render loop (inline selectors were the culprit — switching to stable selector functions fixed it).

The toolbar supports dragging any node type onto the canvas. The submit button fires the pipeline to the backend and shows the result in an alert.

**Backend (FastAPI + NetworkX)**

Minimal and clean. One POST endpoint at `/pipelines/parse` that receives the serialized graph, builds a directed graph with NetworkX, and returns the node count, edge count, and whether the pipeline is a valid DAG.

**Node types included:** Input, Output, LLM, Text (with dynamic variable handles), API, Condition, Filter, Transform, Note

---

## Tech Stack

- **Frontend:** React, ReactFlow, Zustand, Axios
- **Backend:** FastAPI, Uvicorn, NetworkX, Pydantic

---

## Setup & Running

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install fastapi uvicorn networkx pydantic
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

Open the app, drag nodes onto the canvas, connect them, and hit **Submit Pipeline** to validate.
