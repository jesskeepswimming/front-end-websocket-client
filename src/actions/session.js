export const setName = (name) => {
  return {
    type: 'SET_NAME',
    name: name
  };
};

export const setNumPlayers = (num) => {
  return {
    type: 'SET_NUM_PLAYERS',
    numPlayers: num
  };
};

export const toggleReady = () => {
  return {
    type: 'TOGGLE_READY'
  };
};



  