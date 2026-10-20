import { useEffect,useState } from 'react';
import Background from './components/Background.jsx';
import ImageSlider from './components/ImageSlider.jsx';
import { slides } from './data/slides.js';

const angles = [-10,7,-5,9,-8]
export default function App() {
  const [index, setIndex] = useState(2);
  const active = slides[index];

  const next = () => setIndex(current => (current + 1) % slides.length)
  const previous = () => setIndex(current => (current - 1 + slides.length) % slides.length )

  useEffect(()=>{
    const onKeyDown = event => {
      if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener ('keydown',onKeyDown);
    return () =>  window.addEventListener ('keydown',onKeyDown);
  },[]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-ink">
      <Background />
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <header className="flex items-center justify-between border-b border-violet-100 py-8">
          <div className="flex items-center">
            <div className="flex h-20 items-center">
              <img
                className="size-20 transition-[width,height] duration-300 ease-out hover:size-25 motion-reduce:transition-none"
                src="/nox_respirando.svg"
                alt="Nox Mascote"
              />
            </div>
            <strong className="text-mauve tracking-[.24em]">WILD / STORIES</strong>
          </div>
          <nav aria-label="Navegação principal" className="text-xs font-semibold tracking-widest text-slate-500">
            EXPLORAR · SOBRE
          </nav>
        </header>
        <main className="grid gap-16 py-20 lg:grid-cols-2 lg:items-center lg:gap-20">
          <section aria-label="Apresentação" className="space-y-7">
            <p className="text-xs font-bold tracking-[.2em] text-violet-600">
              EXPLORAÇÃO • VIDA SELVAGEM
            </p>
            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              A natureza em cada detalhe.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-500">
              Descubra espécies extraordinárias em uma experiência visual interativa.
            </p>
          </section>
          <ImageSlider />
        </main>
        <footer className="py-10 text-xs font-semibold tracking-widest text-slate-400">
          REACT • TAILWIND CSS • JAVASCRIPT
        </footer>
      </div>
    </div>
  );
}