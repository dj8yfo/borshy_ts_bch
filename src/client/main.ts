import * as borsh from 'borsh';
import * as fs from 'fs';
import {
    GameCell, GameCellTac, GAME_CELL_SCHEMA,
} from './empty_enum'


function main() {
    const chunk = borsh.serialize(
	GAME_CELL_SCHEMA,
	new GameCell('gameCellTac', new GameCellTac()),
    )
    console.log(chunk.length);

    return fs.writeFile('./datums/empty_vars_enum.ts.dat', Buffer.from(chunk), function (err) {
	if (err) {
	    console.log(err);
	    return ;
	}
	console.log('empty vars enum (borsh) > /empty_vars_enum.ts.dat');
    });
}

main()
