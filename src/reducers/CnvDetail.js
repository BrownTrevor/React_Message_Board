export default function CnvDetail(state = [], action) {
   console.log("Msgs reducing action " + action.type);


   switch(action.type) {
   case 'DETAIL':
      var arr = [];

      if (Array.isArray(action.detail)) {
         return action.detail;
      }
      arr.push(action.detail);
      return arr;
   case 'POST_MSG':
      var arr = [];
      var obj = {
         content: action.content,
         whenMade: (new Date).getTime(),
         email: action.email,
      }

      return state.concat(obj);
   default:
      return state;
   }
}
