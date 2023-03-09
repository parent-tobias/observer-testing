# observer-testing

This was largely an experiment in creating a *dynamic* observer decorator, which could be applied to a given object or factory function. While not entirely successful, it was quite a lot of fun, and I had the chance to learn more about how objects work in javascript under the hood.

Notably, playing around with `Proxy` and `Reflect` seems to have some possibilities. If I have the time, I may revisit this.

For my purposes, the final solution of specifying *which* methods/attributes to which I would like to attach listeners seems a viable solution.
