import React from 'react';
import {xpTable} from '../definitions'

//helper function
const itemText = (item) => {
  switch (item.itemType) {
    case 'characters':
      return(<div>
        {item.charName || '[Name]'}
        , Level {item.charLevel || '[Level]'}
        {' '}
        {item.charClass || '[Class]'}
      </div>);
    case 'treasures':
      return(<div>
        {item.treasureName || '[Name]'}
        , {item.valuePer}
        {' '} gp
        {item.treasureNum >1 ?
          ' (x' + item.treasureNum + ')' :
          ''
        }
        {
          item.isMagicItem ?
          ' (magic item)' :
          null
        }
      </div>);
    case 'monsters':
      const crIfValid = (cr) => {
        if (xpTable[cr]) {
          return 'CR ' + cr;
        }
        return '[invalid CR]'
      }
      return(<div>
        {item.monsterName || '[Name]'}
        , {crIfValid(item.cr)}
        {' '}(
        {item.numKilled}
        {' '} killed, {' '}
        {item.numFled}
        {' '} fled)
      </div>);
    case 'expenses':
      return(<div>
        {item.expenseName || '[Name]'}
        , {item.valuePer}
        {' '} gp
        {' (x' + item.expenseNum + ')'}
        {
          item.lmfExpense?
          ' (LMF)' :
          null
        }
      </div>);
    case 'pois':
      let output='';
      switch (item.poiType) {
        case 'poi':
          output += (
            'POI: ' +
            (item.poiName || '[Name]') +
            ', hex ' +
            (item.hexNumber || '[Hex Number]') +
            ', (' +
            (item.distanceFromWall || '[?]') +
            ' hexes from the Wall)'
          );
          break;
        case 'mpoi':
          output += (
            'MPOI: ' +
            (item.poiName || '[Name]') +
            ', hex ' +
            (item.hexNumber || '[#]')
          );
          break;
        case 'hex':
          output += (
            'New Hex: ' +
            (item.hexNumber || '[Hex Number]') +
            ', (' +
            (item.distanceFromWall || '[#]') +
            ' hexes from the Wall)'
          );
          break;
        default:
          break;
      }
      return <div>
        {output}
      </div>;
    default:
      return('');
  }
}

const Item = ({
  item,
  onClick,
  selectedItem
}) => (
  <li
    key={item.id}
    onClick={onClick}
    className=
      {(selectedItem.id === item.id && 
        selectedItem.itemType === item.itemType) ?
        'item isSelected' :
        'item isNotSelected'
      }
  >
    {itemText(item)}
  </li>
);

const ItemList = ({
  items,
  onItemClick,
  numCharacters,
  selectedItem
}) => {
  if (selectedItem.itemType === 'details') {
    return <ul className='itemList'>
      <li>
        Rations used: {' '}
        {selectedItem.daysOut*numCharacters+selectedItem.adjustRations}
      </li>
    </ul>;
  }
  return (
    <ul className='itemList'>
      {items.map(item => (
        <Item
          key= {item.id}
          selectedItem= {selectedItem}
          item= {item}
          onClick= {() => onItemClick(item)}
        />
      ))}
    </ul>
  )
};

export default ItemList;