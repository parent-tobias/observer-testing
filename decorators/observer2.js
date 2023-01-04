import extend from 'proxy-extend';

const Observable = (object) =>(...params) =>{
  let listeners = {};

  const proxy = new Proxy(obj, {
    get(target, prop, receiver){
      const result = Reflect.get( ...arguments);
      listeners[prop]?.forEach( observer => observer(result, target))
      return result;
    },
    set(target, property, value, receiver){
      const isSet = Reflect.set(...arguments);
      if(isSet){
        listeners[prop]?.forEach( observer => observer(property, value, target))
      }
      return isSet;
    },
    apply(target, thisArg, args){
      const result = Reflect.apply(target, thisArg, args); 
      listeners[prop]?.forEach( observer => observer(result, target))
      return result;
    },
  })

  return extend(proxy, {
  // return {
  //   proxy,
    subscribe(message, observer){
      listeners[message]= listeners[message] ? [...listeners[message], observer] : [observer];
    },
    unsubscribe(message, observer){
      listeners[message] = listeners[message].filter(observerFunc => observerFunc !== observer);
    },
  // };
  });
}

export default Observable;

/*****
 * This comes really close to what I want to happen. The issue here is, with `Reflect.get(...arguments),
 * that reflector *wont be run* until after the getter has returned. So I can't see the result of running
 * the function, I can't get the updated object, and my observer is basically firing *before* the function
 * call has happened.
 *****/