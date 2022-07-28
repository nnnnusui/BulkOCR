import {
  Component, createEffect, createSignal, JSX,
} from "solid-js";
import {
  Tesseract,
} from "tesseract.ts";

import styles from './App.module.styl';

const App: Component = () => {
  const [imagePaths, setImagePaths] = createSignal<File[]>([]);
  const onDragOver: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (event) => {
    event.preventDefault();
  };
  const onDrop: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (event) => {
    event.preventDefault();
    const newImagePaths = event.dataTransfer?.files;
    if (!newImagePaths) return;
    setImagePaths((prev) => [...[...newImagePaths].reverse(), ...prev]);
  };

  const [progress, setProgress] = createSignal("");
  const [result, setResult] = createSignal("");
  createEffect(() => {
    const image = imagePaths()[0];
    if (!image) return;
    Tesseract
      .recognize(image)
      .progress((it) => setProgress(it.progress.toString()))
      .then((it) => setResult(it.text))
      .catch((it) => setProgress(it.message));
  });

  return (
    <div
      class={styles.App}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h1>Bulk OCR</h1>
      <p>{result()}</p>
      <p>{progress()}</p>
    </div>
  );
};

export default App;
