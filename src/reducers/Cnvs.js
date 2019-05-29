function Cnvs(state = {}, action) {
   console.log("Cnvs reducing action " + action.type);
   console.log('CNVS STATE: ', state)
   console.log("CNVS ACTION", action);



   switch(action.type) {
   case 'CNVS':
      return action.cnvs;
   case 'PUT':
      var arr = [];

      var err = state.filter((cnv) => action.newTitle === cnv.title);
      if (err.length > 0) {
         return state;
      }

      var arr = state.map((cnv) => {
         if (cnv.id == action.cnvId) {
            cnv.title = action.newTitle;
         }
         return cnv;
      });

      return arr;
   case 'POST':
      return state;     
   case 'DEL':
      return state.filter((cnv) => cnv.id !== action.cnvId);
   default:
      return state;
   }
}

export default Cnvs;
