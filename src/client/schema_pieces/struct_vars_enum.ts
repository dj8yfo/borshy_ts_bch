import Enum from '../helpers_default/enum';
import Struct from '../helpers_default/struct';
import PublicKeyBE from '../helpers_default/be_pubkey';

export class GameInstruction extends Enum {
    gameInstructionGameReset: GameInstructionGameReset | undefined;
    gameInstructionMakeTurn: GameInstructionMakeTurn | undefined;
};

export class GameInstructionGameReset extends Struct {
    playerOne: PublicKeyBE | undefined;
    playerTwo: PublicKeyBE | undefined;
};

export class GameInstructionMakeTurn extends Struct {
    row: number | undefined;
    col: number | undefined;
};

export const GAME_INSTRUCTION_SCHEMA = new Map<any, any>([
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
		['playerOne', PublicKeyBE],
		['playerTwo', PublicKeyBE],
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
    [
	PublicKeyBE,
	{
	    kind: 'struct',
	    fields: [
		['value', [32]],
	    ]
	}
    ]
]);

