const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const typesImage = importAll(require.context('../image/types', false, /\.(png|jpe?g|svg)$/));

export default typesImage;