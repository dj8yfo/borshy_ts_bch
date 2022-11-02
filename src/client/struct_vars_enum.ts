import Enum from './enum';
import Struct from './struct';
import PublicKeyBE from './be_pubkey';

export class GameInstruction extends Enum {
    gameInstructionGameReset: GameInstructionGameReset | undefined;
    gameInstructionMakeTurn: GameInstructionMakeTurn | undefined;

    constructor(properties: any) {
	super(properties);
    }
};

export class GameInstructionGameReset extends Struct {
    playerOne: PublicKeyBE | undefined;
    playerTwo: PublicKeyBE | undefined;

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

