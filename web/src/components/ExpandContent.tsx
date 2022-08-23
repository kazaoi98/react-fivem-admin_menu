import { itemList } from './Data';

interface Itype {
    id: number;
}

const ExpandContent = (props: Itype) => {
    return itemList[props.id].contents
}

export default ExpandContent;