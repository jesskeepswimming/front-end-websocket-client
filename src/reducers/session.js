const session = (state = {
   name:"",
   ready: false,
   numPlayers: 0
    
   }, 
    action) => {
    
    switch (action.type) {

        case 'TOGGLE_READY':
            return {
                ...state,
                ready: true
            };
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'SET_NUM_PLAYERS':
            return {
                ...state,
                numPlayers: action.numPlayers
            };
      
        default: return state;
    }
}

export default session;