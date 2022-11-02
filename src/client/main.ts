import { PublicKey } from '@solana/web3.js';
import PublicKeyBE from './helpers_default/be_pubkey';
import * as borsh from 'borsh';
import * as fs from 'fs';
import {
    GameCell, GameCellTac, GAME_CELL_SCHEMA,
} from './schema_pieces/empty_enum'

import {
    GameInstruction, GameInstructionMakeTurn, GameInstructionGameReset,
    GAME_INSTRUCTION_SCHEMA,
} from './schema_pieces/struct_vars_enum'

import {
    GameState,
    GameStatus,
    GameStatusPlayerOneTurn,
    GAME_STATE_SCHEMA,
} from './schema_pieces/enum_array'

function emptyVarsEnum() {
    const chunk = borsh.serialize(
	GAME_CELL_SCHEMA,
    new GameCell({gameCellTac: new GameCellTac({})}),
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
function range(size:number, startAt:number = 0): Uint8Array {
    return Uint8Array.from([...Array(size).keys()].map(i => i + startAt));
}

function structVarsEnum1() {
    let one: PublicKeyBE = new PublicKeyBE({value: new Uint8Array(32)}).fromPubKey(
	new PublicKey('1thX6LZfHDZZKUs92febYZhYRcXddmzfzF2NvTkPNE')
    );
    let two: PublicKeyBE = new PublicKeyBE({value: new Uint8Array(32)}).fromPubKey(
	new PublicKey('7kuT1dfMhUysWcLEV1eYk8ir7RTjszHmsUdrrPQNThcv')
    );
    structVarsEnum1Arg(one, two, './datums/struct_vars_enum1_1.ts.dat');
    one = new PublicKeyBE({value: range(32, 0)});
    two = new PublicKeyBE({value: range(32, 100)});
    structVarsEnum1Arg(one, two,  './datums/struct_vars_enum1_2.ts.dat');
}

function structVarsEnum1Arg(one: PublicKeyBE, two: PublicKeyBE, file: string) {
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

    fs.writeFile(file, Buffer.from(chunk), function (err) {
    if (err) {
	    console.log(err);
	    return ;
	}
	console.log(`struct vars enum 1 (borsh) > ${file}`);
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


function enumArray() {

    let one = new PublicKeyBE({value: range(32, 0)});
    let two = new PublicKeyBE({value: range(32, 100)});
    const chunk = borsh.serialize(
	GAME_STATE_SCHEMA,
	new GameState({
	    playField:  new Array(9).fill(
	    new GameCell({
		    gameCellTac: new GameCellTac({})
	    })),
	    status:   new GameStatus({
		gameStatusPlayerOneTurn: new GameStatusPlayerOneTurn({})
	    }),
	    playerOne: one,
	    playerTwo: two,
	}),
    )

    fs.writeFile('./datums/enum_array.ts.dat', Buffer.from(chunk), function (err) {
	if (err) {
	    console.log(err);
	    return ;
	}
	console.log('empty vars enum (borsh) > /empty_vars_enum.ts.dat');
    });

    const stateDeser: GameState = borsh.deserialize(
	GAME_STATE_SCHEMA,
	GameState,
	Buffer.from(chunk),
    );

    if (stateDeser.playField!.length != 9) throw new Error(
	"playField length"
    );


}
function main() {
    emptyVarsEnum();
    structVarsEnum1();
    enumArray();
}

main()
