import * as borsh from 'borsh';
import * as fs from 'fs';
import {
    GameCell, GameCellTac, GAME_CELL_SCHEMA,
} from './empty_enum'


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
function main() {
    emptyVarsEnum();
}

main()
