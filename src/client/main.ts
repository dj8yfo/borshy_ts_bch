import { PublicKey } from '@solana/web3.js';
import * as borsh from 'borsh';
import * as fs from 'fs';
import {
	GameCell, GameCellTac, GAME_CELL_SCHEMA,
} from './empty_enum'

import {
	GameInstruction, GameInstructionMakeTurn, GameInstructionGameReset,
	GAME_INSTRUCTION_SCHEMA,
} from './struct_vars_enum'


function emptyVarsEnum() {
	const chunk = borsh.serialize(
		GAME_CELL_SCHEMA,
		new GameCell({gameCellTac: new GameCellTac()}),
	)

	fs.writeFile('./datums/empty_vars_enum.ts.dat', Buffer.from(chunk), function (err) {
		if (err) {
			console.log(err);
			return ;
		}
		console.log('empty vars enum (borsh) > /empty_vars_enum.ts.dat');
	});

	const cellDeser: GameCell = borsh.deserialize(
		GAME_CELL_SCHEMA,
		GameCell,
		Buffer.from(chunk),
	);

	if (cellDeser.gameCellEmpty !== undefined) throw new Error(
		"game cell empty is not undefined"
	);
	if (cellDeser.gameCellTic !== undefined) throw new Error(
		"game cell tic is not undefined"
	);
	if (cellDeser.gameCellTac === undefined) throw new Error(
		"game cell tac is undefined"
	);
	if (cellDeser.enum !== "gameCellTac") throw new Error(
		"wrong enum value"
	);

}

function structVarsEnum1() {
	const one: PublicKey = new PublicKey('1thX6LZfHDZZKUs92febYZhYRcXddmzfzF2NvTkPNE');
	const two: PublicKey = new PublicKey('36UGjpLymavomFSFf85pNYP5sP6dMLeeKyg6nQU7Qwdh');
	const chunk = borsh.serialize(
		GAME_INSTRUCTION_SCHEMA,
		new GameInstruction(
			{gameInstructionGameReset: new GameInstructionGameReset(
				{ playerOne: one, 
					playerTwo: two,
				}
			)}
		),
	)

	fs.writeFile('./datums/struct_vars_enum1.ts.dat', Buffer.from(chunk), function (err) {
		if (err) {
			console.log(err);
			return ;
		}
		console.log('struct vars enum 1 (borsh) > /empty_vars_enum.ts.dat');
	});

	const gameInstDeser: GameInstruction = borsh.deserialize(
		GAME_INSTRUCTION_SCHEMA,
		GameInstruction,
		Buffer.from(chunk),
	);

	if (gameInstDeser.enum !== 'gameInstructionGameReset') throw new Error(
		"game instr enum is not undefined"
	);
	if (!gameInstDeser.gameInstructionGameReset!.playerOne!.equals(one) ) throw new Error(
		"game playerOne undefined"
	);
	if (!gameInstDeser.gameInstructionGameReset!.playerTwo!.equals(two)) throw new Error(
		"game playerTwo undefined"
	);
}
function main() {
	emptyVarsEnum();
	structVarsEnum1();
}

main()
