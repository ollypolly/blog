const itemsA = [
  { label: 'Apple', color: '#fef9c3' },
  { label: 'Banana', color: '#fce7f3' },
  { label: 'Cherry', color: '#fee2e2' },
  { label: 'Date', color: '#dbeafe' },
];

const itemsB = [
  { label: 'Elm', color: '#dcfce7' },
  { label: 'Fern', color: '#e0f2fe' },
  { label: 'Grass', color: '#fef9c3' },
  { label: 'Holly', color: '#fce7f3' },
];

function render(containerId: string, items: typeof itemsA) {
  const el = document.getElementById(containerId)!;
  el.innerHTML = items
    .map(item => `<div class="item" style="background:${item.color}">${item.label}</div>`)
    .join('');
}

(window as any).shuffleA = () => {
  const el = document.getElementById('list-a')!;
  const doShuffle = () => {
    itemsA.sort(() => Math.random() - 0.5);
    render('list-a', itemsA);
  };
  if ('startViewTransition' in el) {
    (el as any).startViewTransition(doShuffle);
  } else {
    doShuffle();
  }
};

(window as any).shuffleB = () => {
  const el = document.getElementById('list-b')!;
  const doShuffle = () => {
    itemsB.sort(() => Math.random() - 0.5);
    render('list-b', itemsB);
  };
  if ('startViewTransition' in el) {
    (el as any).startViewTransition(doShuffle);
  } else {
    doShuffle();
  }
};

render('list-a', itemsA);
render('list-b', itemsB);
