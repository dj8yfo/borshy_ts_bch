import Enum from '../helpers_default/enum';
import Struct from '../helpers_default/struct';

export class GameCell extends Enum {
    gameCellEmpty: GameCellEmpty | undefined;
    gameCellTic: GameCellTic | undefined;
    gameCellTac: GameCellTac | undefined;
};

export class GameCellEmpty extends Struct {
};

export class GameCellTic extends Struct {
};

export class GameCellTac extends Struct {
};


export const GAME_CELL_SCHEMA = new Map<any, any>([
    [
	GameCell,
	{
	    kind: 'enum', field: 'enum', values: [
		['gameCellEmpty', GameCellEmpty],
		['gameCellTic', GameCellTic],
		['gameCellTac', GameCellTac],
	    ],
	},
    ],
    [
	GameCellEmpty,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ],
    [
	GameCellTic,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ],
    [
	GameCellTac,
	{
	    kind: 'struct', fields: [
	    ],
	},
    ]
]);
