import React from 'react';
import {xpTable, months} from '../definitions'

const generateLog = (state) => {

  const characters = state.data.characters;
  const treasures = state.data.treasures;
  const monsters = state.data.monsters;
  const expenses = state.data.expenses;
  const pois = state.data.pois;
  const details = state.data.details;

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

  const calculatePoiValue = (poi) => {
    switch (poi.poiType) {
      case 'poi':
        return 100 + 25*poi.distanceFromWall;
      case 'mpoi':
        return 50;
      case 'hex':
        return 25 * poi.distanceFromWall;
      default:
        return 0;
    }
  }

  const prefixSection = () => {
    return details.date + '\n\n';
  };

  const charactersSection = () => {
    let output = '*Characters* \n';
    for (const c of characters) {
      output += 
        (c.charName || '[Name]') + 
        ' (' + 
        (c.charClass || '[Class]') + 
        ' ' + 
        (c.charLevel || '[Level]') + 
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
          (c.charName || '[Name]') +
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
    const calculateNetGp = () => {
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
        gpTotal += calculatePoiValue(p);
      }

      return gpTotal;
    }

    let output= '*Gold and Treasure*\n';
    let lmfEarned=0;
    let lmfClaimed=[];

    const gpTotal = calculateNetGp();

    for (const e of expenses) {
      e.lmfExpense ?
      lmfEarned -= e.valuePer * e.expenseNum :
      null
    }

    const gpPerPerson=gpTotal/characters.length

    for (const c of characters) {
      let isTypical=true;
      let treasureClaimed = [];
      let goldEarned=gpPerPerson+c.gpAdjust;
      let goldSpent=0;

      for (const t of treasures) {
        if (t.treasureClaimedBy === c.id) {
          isTypical=false;
          goldSpent += t.valuePer*t.treasureNum;
          treasureClaimed.push(
          (t.treasureName || '[Name]') +
          (t.treasureNum > 1 ?
          '(x' + t.treasureNum + ')' :
          '')
        );
        }
      }

      output += (c.charName || '[Name]') + ' earned '
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
          (t.treasureName  || '[Name]') +
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
        '\n\n'
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
    let updateBonus=1.1;
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
    for (const p of pois) {
      totalXp += calculatePoiValue(p);
    }
    for (const c of characters) {
      c.xpAdjust ?
        output += 
          (c.charName || '[Name]') +
          ' earned ' +
          Math.round(totalXp / characters.length + c.xpAdjust) +
          ' xp (' +
        Math.round((totalXp / characters.length + c.xpAdjust) * updateBonus) +
        ' xp with sheet update)\n'
        :
        unadjustedChars.push(c)
      ;
    }
    if (unadjustedChars.length > 0) {
      for (let i=0; i<unadjustedChars.length; i++) {
        const c = unadjustedChars[i];
        switch (i) {
          case unadjustedChars.length-2:
            output += (c.charName  || '[Name]') + ' and ';
            break;
          case unadjustedChars.length-1:
            output += (c.charName || '[Name]');
            break;
          default:
            output += (c.charName || '[Name]') + ', ';
            break;
        }
      }
      output += 
        ' earned ' +
        Math.round(totalXp / characters.length) +
        ' xp (' +
        Math.round(totalXp / characters.length * updateBonus) +
        ' xp with sheet update)\n'
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
      output += (t.treasureName  || '[Name]');
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
          output += (claimedByChars[0].charName  || '[Name]')
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
    let isTreasure=false;
    const magicItems=treasures.filter((t)=>t.isMagicItem);
    const mundaneItems=treasures.filter((t)=>!t.isMagicItem);
    if (magicItems.length > 0) {
      isTreasure=true;
      output += '_Magic Items:_\n';
      for (const t of magicItems) {
        output += describeTreasure(t);
      }
      if (mundaneItems.length > 0) {
        output += '\n';
      }
    }
    if (mundaneItems.length > 0) {
      isTreasure=true;
      output += '_Nonmagical Items:_\n';
      for (const t of mundaneItems) {
        output += describeTreasure(t);
      }
    }
    if (isTreasure) {
      return output + '\n';
    }
    return '';
  }

  const poiSection = () => {
    const describePoi = (p) => {
      switch (p.poiType) {
        case 'poi':
          return ( 
            (p.poiName || '[Name]') +
            ', in hex ' +
            (p.hexNumber || '[hex]') +
            ' (' +
            (100 + p.distanceFromWall * 25) +
            ' gp)\n' +
            (p.poiDescription ?
             '- ' + p.poiDescription + '\n' :
             ''
            )
          );
        case 'mpoi':
          return (
            (p.poiName || '[Name]') +
            ', in hex ' +
            (p.hexNumber || '[hex]\n') +
            (p.poiDescription ?
             '- ' + p.poiDescription + '\n' :
             ''
            )
          );
        case 'hex':
          return (
            'Hex ' +
            (p.hexNumber || '[hex]') +
            ' (' +
            (p.distanceFromWall * 25) +
            ' gp) \n'
          );
        default:
          return '';
      }
    }
    let outputSections = {poi: '', mpoi: '', hex: ''}
    for (const p of pois) {
      outputSections[p.poiType] += describePoi(p);
    }
    return( 
      (outputSections.poi ?
        ('*Points of Interest*\n' + outputSections.poi + '\n') :
        ''
      ) +
      (outputSections.mpoi ?
        ('*Minor Points of Interest*\n' + outputSections.mpoi + '\n') :
        ''
      ) +
      (outputSections.hex ?
        ('*New Hexes*\n' + outputSections.hex + '\n') :
        ''
      )
    );
  };
  const expenseSection = () => {
    const describeExpense = (e) => {
      if (e.expenseNum === 0) {
        return '';
      }

      let output='';
      output += e.expenseName;
      if (e.expenseNum > 1) {
        output += 
          ' x' +
          e.expenseNum
        ;
      }
      output += 
        ' (' +
        e.expenseNum*e.valuePer +
        ' gp'
      ;
      e.expenseNum > 1 ?
        output+= ' total)' :
        output+= ')'
      ;
      e.lmfExpense ?
        output+= ' - paid by LMFfMG' :
        null
      if (e.expenseDescription) {
        output += '\n-' +
          e.expenseDescription
        ;
      }

      return output + '\n';
    };

    let output='';
    const partyExpenses=expenses.filter((e)=>!e.lmfExpense);
    const lmfExpenses=expenses.filter((e)=>e.lmfExpense);
    if (partyExpenses.length > 0) {
      for (const e of partyExpenses) {
        output += describeExpense(e);
      }
    }
    if (lmfExpenses.length > 0) {
      for (const e of lmfExpenses) {
        output += describeExpense(e);
      }
    }
    if (output === '') {
      return '';
    }
    
    return '*Expenses*\n' + output + '\n'
  };
  
  const encounterSection = () => {
    let output='*Encounters*\n';
    let areMonsters=false;

    for (const m of monsters) {
      if (m.numKilled===0 && m.numFled===0) {
        break;
      }
      areMonsters=true;
      output += (m.monsterName || '[Name]')
      switch (m.bonusMult) {
        case '2':
          output+= ' (local power)';
          break;
        case '4':
          output += ' (regional power)';
          break;
        default:
          break;
      }
      output += ', '
      if (m.numKilled) {
        output += m.numKilled + ' killed'
      }
      if (m.numKilled && m.numFled) {
        output += ', '
      }
      if (m.numFled) {
        output += m.numFled + ' fled/bypassed'
      }
    }
    if (areMonsters) {
      return output + '\n';
    }
    return '';
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
    <textarea
      className='output'
      value={generateLog(state)}
      readOnly='true'
      onClick={(e) => e.target.select()}
    />
  );
}

export default LogOutput;