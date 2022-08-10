//import {itemList} from "./Data";
import {sorted} from "./ListEntries"

export function getList() {
    const iList = sorted;
    return iList;
}
  
export function filterList(Type: string) {
  var categ = '';
  switch (Type) {
    case 'favorites':
      categ = 'favorites'
      break;
    case 'player':
      categ = 'player'
      break;
    case 'util':
      categ = 'util'
      break;
    default: 
      console.log("argument doesn't match any case")
  }

  var alter = function(element: any) {
    if (categ === 'favorites' ) {
      return element.favorite > 0;
    } else return element.category === categ;
      
  }
  //let filtered = getList().filter(fav => fav.category === Type);
  var filtered = getList().filter(alter);
  return filtered;
 
}

