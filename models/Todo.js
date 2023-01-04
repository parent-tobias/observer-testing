const Todo = ({
  title='',
  description='',
  created=Date.now(),
  due=Date.now()
}) => {
  let done = false;

  return Object.freeze({
    get title(){ return title; },
    get descripton(){ return description; },
    set description(val){ description = val; return description; },
    get created(){ return created; },
    get due(){ return due; },
    get done(){ return done;},
    toggleStatus(){ done = !done; return done;},
    isA: 'Todo',
  })
}

export default Todo;