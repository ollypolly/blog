// element-scoped view transition
const list = document.querySelector('.my-list');

function shuffle(items: string[]): string[] {
  return [...items].sort(() => Math.random() - 0.5);
}

list?.startViewTransition(() => {
  const sorted = shuffle(['Apple', 'Banana', 'Cherry']);
  console.log('shuffled:', sorted);
});
