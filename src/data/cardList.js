const imageModules = import.meta.glob('../assets/icons/avengers*.webp', {
  eager: true,
  import: 'default',
});

const cardList = Object.values(imageModules).map((image) => ({
  id: crypto.randomUUID(),
  frontImage: image,
}));

export default cardList;
