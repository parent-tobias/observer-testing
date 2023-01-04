/*****
 * Called like
 * Observable( Todo, ['add','remove','update'])
 *****/


const Observable = (factory, observationPoints=[]) =>
  (...params) => {
    let listeners = {};
    const object = factory(...params);

    const subscribe = (message, func) => {
      listeners[message] = listeners[message] ?
        [...listeners[message], func] : [func];
    }
    const unsubscribe = (message, func) => {
      listeners[message] = listeners[message].filter(
        listenerFunc => listenerFunc !== func
      )
    }

    const observers = observationPoints.reduce((obj, message)=>{
      obj[message] = function(){
        let result = object[message](...arguments);
        listeners[message]?.forEach(observerFn=>observerFn(result, object));
        return result;
      }
      return obj;
    },{});

    return {
      ...object,
      ...observers,
      subscribe,
      unsubscribe,
    }
}

export default Observable;