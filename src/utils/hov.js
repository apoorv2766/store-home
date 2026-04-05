/** Attaches inline-style hover handlers to a JSX element.
 *  Usage: <div {...hov({ background:"red" }, { background:"blue" })} /> */
export const hov = (enter, leave) => ({
  onMouseEnter: (e) => Object.assign(e.currentTarget.style, enter),
  onMouseLeave: (e) => Object.assign(e.currentTarget.style, leave),
});
