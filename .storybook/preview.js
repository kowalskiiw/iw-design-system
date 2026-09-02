import '../tokens/semantic.css';
import '../tokens/type.css';

// Auto-load every component stylesheet; new files are picked up automatically.
import.meta.glob('../components/*.css', { eager: true });

/** @type { import('@storybook/html-vite').Preview } */
export default { parameters: {} };
