import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";

import Enum from './enum';
import Struct from './struct';

export class GameInstruction extends Enum {
	gameInstructionGameReset: GameInstructionGameReset | undefined;
	gameInstructionMakeTurn: GameInstructionMakeTurn | undefined;

	constructor(properties: any) {
		super(properties);
	}
};

export class GameInstructionGameReset extends Struct {
	playerOne: PublicKey | undefined;
	playerTwo: PublicKey | undefined;

	constructor(properties: any) {
		super(properties);
	}
};

export class GameInstructionMakeTurn extends Struct {
	row: number | undefined;
	col: number | undefined;

	constructor(properties: any) {
		super(properties);
	}
};

const ITER_1_SCHEMA = new Map<any, any>([
	[
		GameInstruction,
		{
			kind: 'enum', field: 'enum', values: [
				['gameInstructionGameReset', GameInstructionGameReset],
				['gameInstructionMakeTurn', GameInstructionMakeTurn],
			],
		},
	],
	[
		GameInstructionGameReset,
		{
			kind: 'struct', fields: [
				['playerOne', PublicKey],
				['playerTwo', PublicKey],
			],
		},
	],
	[
		GameInstructionMakeTurn,
		{
			kind: 'struct', fields: [
				['row', 'u8'],
				['col', 'u8'],
			],
		},
	],
]);

export const GAME_INSTRUCTION_SCHEMA = new Map([...ITER_1_SCHEMA, ...SOLANA_SCHEMA])
