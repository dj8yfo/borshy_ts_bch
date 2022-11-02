use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Copy, Clone, PartialEq, Eq, Debug)]
pub enum GameCell { Empty, Tic, Tac }

impl Default for GameCell {
    fn default() -> Self { GameCell::Empty }
}
