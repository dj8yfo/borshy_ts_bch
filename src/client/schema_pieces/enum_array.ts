import Enum from '../helpers_default/enum';
import Struct from '../helpers_default/struct';
import PublicKeyBE from '../helpers_default/be_pubkey';
import {GameCell, GAME_CELL_SCHEMA} from './empty_enum'

export class GameStatus extends Enum {
    gameStatusUninitialized: GameStatusUninitialized | undefined;
    gameStatusPlayerOneTurn: GameStatusPlayerOneTurn | undefined;
    gameStatusPlayerTwoTurn: GameStatusPlayerTwoTurn | undefined;
    gameStatusGameEnd: GameStatusGameEnd | undefined;
};

export class GameStatusUninitialized extends Struct {
};

export class GameStatusPlayerOneTurn extends Struct {
};

export class GameStatusPlayerTwoTurn extends Struct {
};

export class GameStatusGameEnd extends Struct {
};

export class GameState extends Struct {
    playField: GameCell[] | undefined;
    status: GameStatus | undefined;
    playerOne: PublicKeyBE | undefined;
    playerTwo: PublicKeyBE | undefined;
};

export const _GAME_STATE_SCHEMA = new Map<any, any>([
    [
	GameStatus,
	{
	    kind: 'enum', field: 'enum', values: [
		['gameStatusUninitialized', GameStatusUninitialized],
		['gameStatusPlayerOneTurn', GameStatusPlayerOneTurn],
		['gameStatusPlayerTwoTurn', GameStatusPlayerTwoTurn],
		['gameStatusGameEnd', GameStatusGameEnd],
	    ],
	},
    ],
    [
	GameStatusUninitialized,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ],
    [
	GameStatusPlayerOneTurn,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ],
    [
	GameStatusPlayerTwoTurn,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ],
    [
	GameStatusGameEnd,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ],
    [
	GameState,
	{
	    kind: 'struct', fields: [
		['playField', [GameCell, 9]],
	    ['status', GameStatus],
		['playerOne', PublicKeyBE],
		['playerTwo', PublicKeyBE],
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

export const GAME_STATE_SCHEMA = new Map([..._GAME_STATE_SCHEMA, ...GAME_CELL_SCHEMA])
