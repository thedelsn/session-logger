import React from 'react';
import {xpTable} from '../definitions'

const generateLog = (state) => {

	const characters = state.data.characters;
	const treasures = state.data.treasures;
	const monsters = state.data.monsters;

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
	//TODO: implement expenses
	const gpSection = () => {
		let output= '*Gold*\n';
		let gpTotal=0;
		let lmfEarned=0;
		let lmfClaimed=[];

		for (const t of treasures) {
			gpTotal += t.valuePer * t.treasureNum
		}
		const gpPerPerson=gpTotal/characters.length
		for (const c of characters) {
			let treasureClaimed = [];
			//the *1 is to make it interpret gpAdjust as a number
			let goldEarned=gpPerPerson+c.gpAdjust*1;
			let goldSpent=0;

			for (const t of treasures) {
				if (t.claimedBy*1 === c.id*1) {
					goldSpent += t.valuePer*t.treasureNum;
					treasureClaimed.push(t.treasureName);
				}
			}

			output += c.charName + ' earned '
			if (c.isDonating) {
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
			if (t.claimedBy*1 === -1) {
				lmfEarned -= t.valuePer*t.treasureNum;
				lmfClaimed.push(t.treasureName);
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
		return output + '\n';
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
					Math.round(totalXp / characters.length + c.xpAdjust*1) +
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
			if (t.claimedBy>=-1) {
				output += ' - claimed by ';
				t.claimedBy === '-1' ?
					output += 'the LMFfAG' :
					output += characters.filter(
						(c)=>c.id*1===t.claimedBy*1
					)[0].charName
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

	const log= 
		charactersSection() + 
		changesSection() +
		gpSection() +
		xpSection() +
		treasureSection();
	return log;
};

const LogOutput = ({state}) => {
	return (
		//TODO: delete the rows and columns and format size w CSS 
		<textarea
			rows='30'
			cols='60'
			value={generateLog(state)}
			readOnly='true'
			onClick={(e) => e.target.select()}
		/>
	);
}

export default LogOutput;