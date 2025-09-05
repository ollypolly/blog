declare module 'rehype-figure' {
  import { Plugin } from 'unified';
  
  interface RehypeFigureOptions {
    className?: string;
  }
  
  const rehypeFigure: Plugin<[RehypeFigureOptions?], any>;
  export default rehypeFigure;
}