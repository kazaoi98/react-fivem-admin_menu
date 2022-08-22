import ConstructionIcon from '@mui/icons-material/Construction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    { id: 0, text: "Noclip",  checkboxId: 100, checkable: true, favorite: 0, category: 'player', expandable: false},
    { id: 1, text: "God",  checkboxId: 101, checkable: true, favorite: 0, category: 'player', expandable: false},
    { id: 2, text: "Teleport",  checkboxId: 102, checkable: false, favorite: 0, category: 'player', expandable: true},
    { id: 3, text: "Attach",  checkboxId: 103, checkable: false, favorite: 0, category: 'util', expandable: true},
    { id: 4, text: "Ban",  checkboxId: 104, checkable: false, favorite: 0, category: 'util', expandable: true},
    { id: 5, text: "cSay",  checkboxId: 105, checkable: false, favorite: 0, category: 'util', expandable: true},
    { id: 6, text: "Engine Sound",  checkboxId: 106, checkable: false, favorite: 0, category: 'util', expandable: true},
    { id: 7, text: "Delete Prop",  checkboxId: 107, checkable: false, favorite: 0, category: 'util', expandable: true },
    { id: 8, text: "Fix vehicle",  checkboxId: 108, checkable: false, favorite: 0, category: 'util', expandable: false },
    { id: 9, text: "Bring",  checkboxId: 109, checkable: false, favorite: 0, category: 'util', expandable: true },
    { id: 10, text: "Revive in radius",  checkboxId: 110, checkable: false, favorite: 0, category: 'util', expandable: false },
    { id: 11, text: "Invisibility",  checkboxId: 111, checkable: true, favorite: 0, category: 'player', expandable: false },
    { id: 12, text: "Debug mode",  checkboxId: 112, checkable: true, favorite: 0, category: 'player', expandable: false },
    { id: 13, text: "Spawn menu",  checkboxId: 113, checkable: false, favorite: 0, category: 'util', expandable: true },
    { id: 14, text: "Unflip vehicle",  checkboxId: 114, checkable: false, favorite: 0, category: 'util', expandable: false },
    { id: 15, text: "Show player blips",  checkboxId: 115, checkable: true, favorite: 0, category: 'util', expandable: false },
];

export const xyzForm = [
  {id: 'X_field', label: 'X'},
  {id: 'Y_field', label: 'Y'},
  {id: 'Z_field', label: 'Z'},
];