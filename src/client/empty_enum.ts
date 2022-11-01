export class GameCell {
	enum: string;
	gameCellEmpty: GameCellEmpty | undefined;
	gameCellTic: GameCellTic | undefined;
	gameCellTac: GameCellTac | undefined;


	constructor(
		key: string,
		value: any,
	) {
		this.enum = key;
		this[key as keyof typeof this] = value;
	}
};

export class GameCellEmpty {
};

export class GameCellTic {
};

export class GameCellTac {
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