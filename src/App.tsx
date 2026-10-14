import { Component, createSignal, createMemo, createEffect, For } from 'solid-js';
import { MetricCard } from './components/MetricCard.js';

interface RoadmapItem {
  id: number;
  title: string;
  stage: string;
  completed: boolean;
}

export const App: Component = () => {
  // Fine-grained reactive signals (compiled into direct DOM subscriptions, zero VDOM)
  const [count, setCount] = createSignal(0);
  const [step, setStep] = createSignal(1);
  const [newItemTitle, setNewItemTitle] = createSignal('');

  const [items, setItems] = createSignal<RoadmapItem[]>([
    { id: 1, title: 'Fine-Grained Reactivity (createSignal, createMemo)', stage: 'Stage 1: Core', completed: true },
    { id: 2, title: 'Control Flow Primitives (<For>, <Show>, <Switch>)', stage: 'Stage 2: Templates', completed: true },
    { id: 3, title: 'Stores & Context Architecture (createStore)', stage: 'Stage 3: Architecture', completed: false },
    { id: 4, title: 'SolidStart Fullstack SSR & Islands', stage: 'Stage 4: Fullstack', completed: false },
    { id: 5, title: 'Production Multi-Stage Docker Container', stage: 'Stage 7: Production', completed: true }
  ]);

  // Derived reactive memo
  const doubled = createMemo(() => count() * 2);
  const completedCount = createMemo(() => items().filter((i) => i.completed).length);
  const totalCount = createMemo(() => items().length);
  const completionPercent = createMemo(() =>
    totalCount() === 0 ? 0 : Math.round((completedCount() / totalCount()) * 100)
  );

  // Side effect triggered strictly when count changes
  createEffect(() => {
    if (count() >= 10) {
      console.log(`[SolidJS Signal Effect] Milestone reached: count = ${count()}`);
    }
  });

  const addItem = (e: Event) => {
    e.preventDefault();
    const title = newItemTitle().trim();
    if (!title) return;

    setItems([
      ...items(),
      {
        id: Date.now(),
        title,
        stage: 'Stage 6: Custom Topic',
        completed: false
      }
    ]);
    setNewItemTitle('');
  };

  const toggleItem = (id: number) => {
    setItems(items().map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const removeItem = (id: number) => {
    setItems(items().filter((item) => item.id !== id));
  };

  return (
    <div class="container">
      <header class="header">
        <div class="badge">SolidJS &bull; Fine-Grained Signals</div>
        <h1 class="title">Learn SolidJS</h1>
        <p class="subtitle">
          Pure fine-grained reactivity compiled to surgical DOM updates with zero Virtual DOM overhead.
        </p>
      </header>

      {/* Metrics Row */}
      <div class="grid">
        <MetricCard title="Signal Base" value={count()} description="Direct DOM subscriber" icon="🔢" />
        <MetricCard title="Derived Memo" value={doubled()} description="Computed via createMemo" icon="⚡" />
        <MetricCard
          title="Curriculum Mastery"
          value={`${completionPercent()}%`}
          description={`${completedCount()} of ${totalCount()} stages mastered`}
          icon="🎯"
        />
      </div>

      <div class="grid">
        {/* Interactive Reactive Counter */}
        <div class="card">
          <h2 class="card-title"><span>⚡</span> Fine-Grained Signal Sandbox</h2>
          <p class="card-desc">Unlike React, only the exact text node updates when clicking below.</p>

          <div class="counter-value">{count()}</div>

          <div class="btn-group">
            <button onClick={() => setCount((c) => c - step())}>- Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button class="primary" onClick={() => setCount((c) => c + step())}>
              + Increment
            </button>
          </div>

          <div style={{ 'margin-top': '1.5rem', display: 'flex', 'align-items': 'center', 'justify-content': 'space-between' }}>
            <label for="step-select" style={{ 'font-size': '0.9rem', color: '#94a3b8' }}>
              Increment Step:
            </label>
            <select
              id="step-select"
              value={step()}
              onChange={(e) => setStep(Number(e.currentTarget.value))}
              style={{
                background: '#080d1a',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                'border-radius': '6px',
                padding: '0.4rem 0.8rem'
              }}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        {/* 7-Stage Curriculum Progression */}
        <div class="card">
          <h2 class="card-title"><span>📚</span> 7-Stage Progression Checklist</h2>
          <p class="card-desc">Rendered with SolidJS keyed &lt;For&gt; control flow primitive.</p>

          <form onSubmit={addItem} class="input-group">
            <input
              type="text"
              placeholder="Add topic or milestone..."
              value={newItemTitle()}
              onInput={(e) => setNewItemTitle(e.currentTarget.value)}
            />
            <button type="submit" class="primary">
              Add
            </button>
          </form>

          <ul class="item-list">
            <For each={items()}>
              {(item) => (
                <li class={`item ${item.completed ? 'done' : ''}`}>
                  <label style={{ display: 'flex', 'align-items': 'center', gap: '0.65rem', cursor: 'pointer', flex: '1' }}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id)}
                    />
                    <span>{item.title}</span>
                  </label>
                  <button class="delete-btn" onClick={() => removeItem(item.id)} title="Delete item">
                    &times;
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      <footer>
        <p>&copy; The Learning Hub Organization &bull; Built with SolidJS and Vite</p>
      </footer>
    </div>
  );
};
