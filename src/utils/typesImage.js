// Importa tutte le immagini dalla directory specificata
const importAll = (r) => {
  let images = {};
  // Ottieni un elenco dei file corrispondenti ai criteri specificati
  r.keys().forEach((item) => {
    // Assegna al nome del file l'immagine importata
    images[item.replace('./', '').replace('.png', '')] = r(item);
  });
  return images;
};

// Importa tutte le immagini della directory '../image/types' con estensione .png .jpg .jpeg .svg
const typesImage = importAll(require.context('../image/types', false, /\.(png|jpe?g|svg)$/));

export default typesImage;