const toHtml = (str)=>document.createRange()
       .createContextualFragment(
         str.trim()
       ).firstChild;

export default toHtml;