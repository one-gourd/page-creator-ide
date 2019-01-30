import Chance from 'chance';
const chance = new Chance();

export function modelPropsGen() {
  return {
    visible: true,
    text: chance.word()
  };
}

