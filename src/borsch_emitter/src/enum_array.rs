use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq, Eq, Clone, Copy)]
pub enum GameStatus { Uninitialized, PlayerOneTurn, PlayerTwoTurn, GameEnd }

#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq, Eq)]
pub struct GameState {
    pub play_field: [crate::empty_vars_enum::GameCell; 9],
    pub status: GameStatus,
    pub player_one: Pubkey,
    pub player_two: Pubkey
}
