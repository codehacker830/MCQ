let warned = false;

export const randomNumber = (max: number = 10000) => {
  const num = Math.floor(Math.random() * max) + 1;

  if (!warned) {
    /* tslint:disable-next-line:no-console */
    console.warn("Warning, placeholder randomNumber used.");
    warned = true;
  }

  return num;
};
