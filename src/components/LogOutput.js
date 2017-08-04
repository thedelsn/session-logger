import React from 'react';
import {xpTable, months} from '../definitions'

const generateLog = (state) => {

  const characters = state.data.characters;
  const treasures = state.data.treasures;
  const monsters = state.data.monsters;
  const expenses = state.data.expenses;
  const pois = state.data.pois;

  const listToOutputText = (prefix, itemNames) => {
    let output = '';
    if (itemNames.length > 0) {
      output += prefix;
      for (let i=0; i<itemNames.length; i++) {
        const name = itemNames[i];
        switch (i) {
          case itemNames.length-2:
            output += name + ' and '
            break;
          case itemNames.length-1:
            output += name
            break;
          default:
            output += name + ', '
            break;
        }
      }
    }
    return output
  }

  const calculateGpTotal = () => {
    let gpTotal=0;

    for (const t of treasures) {
      gpTotal += t.valuePer * t.treasureNum
    }
    for (const e of expenses) {
      e.lmfExpense ?
      null :
      gpTotal -= e.valuePer * e.expenseNum
    }
    for (const p of pois) {
      switch (p.poiType) {
        case 'poi':
          gpTotal += 100 + 25*p.distanceFromWall;
          break;
        case 'mpoi':
          gpTotal += 50;
          break;
        case 'hex':
          gpTotal += 25 * p.distanceFromWall;
      }
    }
    return gpTotal;
  }

  const prefixSection = () => {
    let today = new Date();
    return (
      months[today.getMonth()] +
      ' ' + 
      today.getDate() +
      ', ' +
      today.getFullYear() +
      '\n\n'
    );
  };

  const charactersSection = () => {
    let output = '*Characters* \n';
    for (const c of characters) {
      output += 
        c.charName + 
        ' (' + 
        c.charClass + 
        ' ' + 
        c.charLevel + 
        ')\n';
    }
    return output + '\n';
  };
  const changesSection = () => {
    let output = '*Character Changes* \n';
    let areChanges = false;
    for (const c of characters) {
      if (c.charChanges) {
        output +=
          c.charName +
          ' ' +
          c.charChanges +
          '\n';
        areChanges = true
      }
    }

    if (areChanges) {
      return output + '\n';
    } else {
      return '';
    }
  }
  const gpSection = () => {
    let output= '*Gold and Treasure*\n';
    let lmfEarned=0;
    let lmfClaimed=[];

    const gpTotal = calculateGpTotal();

    for (const e of expenses) {
      e.lmfExpense ?
      lmfEarned -= e.valuePer * e.expenseNum :
      null
    }

    const gpPerPerson=gpTotal/characters.length

    for (const c of characters) {
      let treasureClaimed = [];
      let goldEarned=gpPerPerson+c.gpAdjust;
      let goldSpent=0;

      for (const t of treasures) {
        if (t.treasureClaimedBy === c.id) {
          goldSpent += t.valuePer*t.treasureNum;
          treasureClaimed.push(
          t.treasureName +
          (t.treasureNum > 1 ?
          '(x' + t.treasureNum + ')' :
          '')
        );
        }
      }

      output += c.charName + ' earned '
      if (c.isDonating && gpTotal>0) {
        lmfEarned += goldEarned/6;
        output += 
          Math.round(goldEarned*5/6 - goldSpent) +
          ' gp (donating)'
        ;
      }
      else {
        output +=
          Math.round(goldEarned - goldSpent) +
          ' gp'
        ;
      }
      output += listToOutputText(', ', treasureClaimed);
      output += '\n';
    }
    for (const t of treasures) {
      if (t.treasureClaimedBy === -1) {
        lmfEarned -= t.valuePer*t.treasureNum;
        lmfClaimed.push(
          t.treasureName +
          (t.treasureNum > 1 ?
          '(x' + t.treasureNum + ')' :
          '')
        );
      }
    }
    if (lmfEarned) {
      output += 
        '\nLMFfAG earned ' +
        Math.round(lmfEarned) +
        ' gp' +
        listToOutputText(', ', lmfClaimed) +
        '\n'
      ;
    } else {
      output +=
        listToOutputText('\nLMFfAG claimed ', lmfClaimed) +
        '\n'
      ;
    }
    return output;
  };
  const xpSection = () => {
    let output = '*XP*\n';
    let unadjustedChars = [];
    let totalXp = 0;
    for (const m of monsters) {
      const xpPer = xpTable[m.cr] || 0;
      //monsters killed are worth 1/4 xp, fled are worth 1/8
      totalXp += 
        xpPer * m.numKilled * 0.25 * m.bonusMult +
        xpPer * m.numFled * 0.125
      ;
    }
    for (const t of treasures) {
      t.isMagicItem ?
        totalXp += t.valuePer * t.treasureNum * 0.5 :
        totalXp += t.valuePer * t.treasureNum
      ;
    }
    for (const c of characters) {
      c.xpAdjust ?
        output += 
          c.charName +
          ' earned ' +
          Math.round(totalXp / characters.length + c.xpAdjust) +
          ' xp\n'
        :
        unadjustedChars.push(c)
      ;
    }
    if (unadjustedChars.length > 0) {
      for (let i=0; i<unadjustedChars.length; i++) {
        const c = unadjustedChars[i];
        switch (i) {
          case unadjustedChars.length-2:
            output += c.charName + ' and ';
            break;
          case unadjustedChars.length-1:
            output += c.charName;
            break;
          default:
            output += c.charName + ', ';
            break;
        }
      }
      output += 
        ' earned ' +
        Math.round(totalXp / characters.length) +
        ' xp\n'
      ;
    }

    return output + '\n';
  }
  const treasureSection = () => {
    const describeTreasure = (t) => {
      let output='';
      let claimedByChars = characters.filter(
            (c)=>c.id===t.treasureClaimedBy
          );
      output += t.treasureName;
      if (t.treasureNum > 1) {
        output += 
          ' x' +
          t.treasureNum
        ;
      }
      output += 
        ' (' +
        t.treasureNum*t.valuePer +
        ' gp'
      ;
      t.treasureNum > 1 ?
        output+= ' total)' :
        output+= ')'
      ;
      if (t.treasureClaimedBy===-1 || claimedByChars.length > 0) {
        output += ' - claimed by ';
        t.treasureClaimedBy === -1 ?
          output += 'the LMFfAG' :
          output += claimedByChars[0].charName
        ;
      }
      if (t.treasureDescription) {
        output += '\n-' +
          t.treasureDescription
        ;
      }

      return output + '\n';
    }

    let output='*Treasure Found*\n';
    const magicItems=treasures.filter((t)=>t.isMagicItem);
    const mundaneItems=treasures.filter((t)=>!t.isMagicItem);
    if (magicItems.length > 0) {
      output += '_Magic Items:_\n';
      for (const t of magicItems) {
        output += describeTreasure(t);
      }
      output += '\n';
    }
    if (mundaneItems.length > 0) {
      output += '_Nonmagical Items:_\n';
      for (const t of mundaneItems) {
        output += describeTreasure(t);
      }
    }
    return output + '\n';
  }
  //TODO
  const poiSection = () => {
    return 'ADD POI SECTION\n\n'
  };
  //TODO
  const expenseSection = () => {
    return 'ADD EXPENSES SECTION\n\n'
  };
  //TODO
  const encounterSection = () => {
    return 'ADD ENCOUNTER SECTION'
  };

  const log= 
    prefixSection() +
    charactersSection() + 
    changesSection() +
    gpSection() +
    xpSection() +
    treasureSection() +
    expenseSection() +
    poiSection() +
    encounterSection();
  return log;
};

const LogOutput = ({state}) => {
  return (
    //TODO: delete the rows and columns and format size w CSS 
    <textarea
      className='output'
      rows='30'
      cols='60'
      value={generateLog(state)}
      readOnly='true'
      onClick={(e) => e.target.select()}
    />
  );
}

export default LogOutput;