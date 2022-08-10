import * as React from 'react';
import TeleportContent from './TeleportContent'
import AttachContent from './AttachContent'
import BringContent from './BringContent'
import DelPropContent from './DelPropContent'
import BanContent from './BanContent'

interface Itype {
    option: number;
}

const ExpandContent = (props: Itype) => {
    let { option } = props;

    switch (option) {
        case 2:
            return <TeleportContent />;
        case 3: 
            return <AttachContent />;
        case 4:
            return <BanContent />;
        case 7:
            return <DelPropContent />;
        case 9:
            return <BringContent />;
        default: 
            return null;
    }
}

export default ExpandContent;