import ConstructionIcon from '@mui/icons-material/Construction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TeleportContent from './TeleportContent';
import AttachContent from './AttachContent';
import BanContent from './BanContent';
import BringContent from './BringContent';
import DelPropContent from './DelPropContent';
import SpawnMenuContent from './SpawnMenuContent';

export const navButtons = [
    {
      id: 1,
      label: 'All',
      value: "all",
      icon: <ListIcon />,
    },
    {
      id: 2,
      label: 'Favorites',
      value: "favorites",
      icon: <FavoriteIcon />
    },
    {
      id: 3,
      label: 'Util',
      value: "util",
      icon: <ConstructionIcon />
    },
    {
      id: 4,
      label: 'Player',
      value: "player",
      icon: <AccountCircleIcon />
    }
];


export const itemList = [
    { id: 0, text: "Noclip",            checkboxId: 0, checkable: true,   favorite: 0, category: 'player',  contents: null},
    { id: 0, text: "God",               checkboxId: 0, checkable: true,   favorite: 0, category: 'player',  contents: null},
    { id: 0, text: "Teleport",          checkboxId: 0, checkable: false,  favorite: 0, category: 'player',  contents: <TeleportContent />},
    { id: 0, text: "Attach",            checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: <AttachContent />},
    { id: 0, text: "Ban",               checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: <BanContent />},
    { id: 0, text: "cSay",              checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: null},
    { id: 0, text: "Delete Prop",       checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: <DelPropContent />},
    { id: 0, text: "Fix vehicle",       checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: null},
    { id: 0, text: "Bring",             checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: <BringContent />},
    { id: 0, text: "Revive in radius",  checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: null},
    { id: 0, text: "Invisibility",      checkboxId: 0, checkable: true,   favorite: 0, category: 'player',  contents: null},
    { id: 0, text: "Debug mode",        checkboxId: 0, checkable: true,   favorite: 0, category: 'player',  contents: null},
    { id: 0, text: "Spawn menu",        checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: <SpawnMenuContent />},
    { id: 0, text: "Unflip vehicle",    checkboxId: 0, checkable: false,  favorite: 0, category: 'util',    contents: null},
    { id: 0, text: "Show player blips", checkboxId: 0, checkable: true,   favorite: 0, category: 'util',    contents: null},
];

const assignIds = () => {
  let i;
  for (i = 0; i < itemList.length; i++) {
   itemList[i].id = i
   itemList[i].checkboxId = i
  }
};
assignIds()

export const xyzForm = [
  {id: 'X_field', label: 'X'},
  {id: 'Y_field', label: 'Y'},
  {id: 'Z_field', label: 'Z'},
];



