const uniqueIdFunc = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
};

export default uniqueIdFunc;
