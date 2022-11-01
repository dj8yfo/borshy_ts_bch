use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq, Eq)]
pub enum GameInstruction {
    GameReset {
        player_one: Pubkey,
        player_two: Pubkey
    },
    MakeTurn {
        row: u8,
        col: u8
    }
}
