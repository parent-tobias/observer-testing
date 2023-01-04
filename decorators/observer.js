
const Observable = (object) =>{
  let listeners = {};

  const subscribe = (message, func) => {
    listeners[message] = listeners[message] ?
      [...listeners[message], func] : [func];
  }
  const unsubscribe = (message, func) => {
    listeners[message] = listeners[message].filter(
      listenerFunc => listenerFunc !== func
    )
  }

  let accessorObject = Object.keys(object).reduce( (accessor, key)=>{
    switch(typeof object[key]){
      case 'function':
        // This key references a function, so we need to
        //  intercept that function and do something
        return {
          ...accessor, 
          [key]: function(){
            let returnValue = object[key](...arguments);
             listeners[key]?.forEach( observer=>observer(returnValue, object))
             return returnValue;
           }
          };
      default:
        if(  Object.getOwnPropertyDescriptor(object, key).set
          || Object.getOwnPropertyDescriptor(object, key).writable ){
          accessor = {...accessor,
            get [key](){
              let returnValue = object[key];
              listeners[key]?.forEach( observer=>observer(returnValue, object))
              return returnValue;
            },
            set [key](value){
              let returnValue = object[key](value);
              listeners[key]?.forEach( observer=>observer(returnValue, object))
              return returnValue;
            }
          }
        } else {
          accessor = {...accessor,
            get [key](){
              let returnValue = object[key];
              listeners[key]?.forEach( observer=>observer(returnValue, object))
              return returnValue;
            }
          }
        }
    }
    return accessor
  }, {});
  accessorObject.subscribe = subscribe;
  accessorObject.unsubscribe = unsubscribe;

  return Object.freeze(accessorObject);
}

export default Observable;

/******
 * This is basically me attempting to hand-craft a Proxy object, and it doesn't work really well. 
 *  There are a few issues: I don't handle attributes themselves (things that are rewritable,
 *  but not getters or setters) is the biggie.
 * Trying again in observer2, with Proxy.
 *****/