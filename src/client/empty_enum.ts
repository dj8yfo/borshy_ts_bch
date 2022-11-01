export class GameCell {
	enum: string | undefined;
	gameCellEmpty: GameCellEmpty | undefined;
	gameCellTic: GameCellTic | undefined;
	gameCellTac: GameCellTac | undefined;


    constructor(properties: any) {
        if (Object.keys(properties).length !== 1) {
            throw new Error('Enum can only take single value');
        }
        Object.keys(properties).map((key) => {
            this[key as keyof typeof this] = properties[key];
            this.enum = key;
        });
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
