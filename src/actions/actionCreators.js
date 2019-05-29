import * as api from '../api';

export function signIn(credentials, cb) {
   console.log("signIn action creator");
   return (dispatch, prevState) => {
      api.signIn(credentials)
         .then((userInfo) => dispatch({ user: userInfo, type: "SIGN_IN" }))
         .then(() => {if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'LOGIN_ERR', details: error});
         });
      //setTimeout(() => dispatch({user: credentials, type: "SIGN_IN"}), 2000);
   };
}

export function getCnvs(credentials, cb) {
      console.log("cnvs action creator");
      return (dispatch, prevState) => {
         api.getCnvs()
            .then((cnvsInfo) => dispatch({ cnvs: cnvsInfo, type: "CNVS" }))
            .then(() => { if (cb) cb(); })
            .catch((error) => {
               dispatch({ type: 'CNVS_ERR', details: error });
            });
         };
}

export function delCnv(id,  cb) {
   return (dispatch, prevState) => {
      api.delCnv(id)
         .then(() => dispatch({
            type: "DEL",
            cnvId: id
         }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'CNVS_ERR', details: error });
         });
   };
}

export function putCnv(id, body, cb) {
   console.log("Putting CNVS action creator");
   return (dispatch, prevState) => {
      api.putCnv(id,body)
         .then(() => dispatch({ type: "PUT", 
          cnvId: id, newTitle: body.title }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'CNVS_ERR', details: error });
         });
   };
}

export function postCnv(body, cb) {
   console.log("Posting CNVS action creator");
   return (dispatch, prevState) => {
      api.postCnv(body)
         .then(() => dispatch({
            type: "POST",
            name: body.title,
         }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'CNVS_ERR', details: error });
         });
   };
}

export function getMsgs(id, cb) {
   console.log("MSGS action creator");
   return (dispatch, prevState) => {
      api.getMsgs(id)
         .then((msgsInfo) => dispatch({ detail: msgsInfo, type: "DETAIL" }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'DETAIL_ERR', details: error });
         });
   };
}

export function postMsg(id, email,  body, cb) {
   console.log("MSGS action creator");
   console.log("POSTING: ", id, email, body);

   return (dispatch, prevState) => {
      api.postMsg(id, body)
         .then(() => dispatch({ 
            content: body.content, 
            email: email, 
            type: "POST_MSG" }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'DETAIL_ERR', details: error });
         });
   };
}

export function getPrss(id, cb) {
   console.log("PRSS-GET action creator");

   return (dispatch, prevState) => {
      api.getPrss(id)
         .then((prssInfo) => dispatch({ prss: prssInfo, type: "PRSS" }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'PRSS_ERR', details: error });
         });
   };
}


export function register(data, cb) {
   console.log("register action creator");
   return (dispatch, prevState) => {
      api.register(data)
      .then(() => {if (cb) cb(); })
      .catch(error => {
         console.log("Registration error" + error);
         dispatch({type: 'REGISTER_ERR', details: error});
      });
   };
}


export function signOut(cb) {
   return (dispatch, prevState) => {
      api.signOut()
         .then(() => dispatch({ type: 'SIGN_OUT' }))
         .then(() => {if (cb) cb();})
         .catch((err) => {
            console.log("Sign out error!");
            dispatch({type: "ERROR", err});
         });
   };
}

export function postError(type, details, cb) {
   return (dispatch, prevState) => {
      dispatch({type, details});
      if (cb)
         cb();
   };
}

export function clearErrors(cb) {
   return (dispatch, prevState) => {
      dispatch({type: "CLEAR_ERRS"});
      if (cb)
         cb();
   };
}
