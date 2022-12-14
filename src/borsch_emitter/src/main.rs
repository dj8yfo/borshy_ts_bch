use std::fs::OpenOptions;
use std::io::Write;

mod empty_vars_enum;
mod struct_vars_enum;
mod enum_array;

fn byte_slice_to_file(name: &str, data_slice: &[u8]) {
    let mut file = OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .open(name)
        .expect("rewrite empty_vars_enum.dat");

    file.write_all(data_slice)
        .expect("write byte slice to file");
}

mod experiment {
    use borsh::{BorshDeserialize, BorshSerialize};
    use solana_program::pubkey::Pubkey;
    use std::convert::TryInto;

    pub fn empty_vars_enum() {
        let mut data_slice = Vec::<u8>::new();

        let math_stuff = crate::empty_vars_enum::GameCell::Tac;
        math_stuff
            .serialize(&mut data_slice)
            .expect("borsh serialize");

        let deser_math_stuff =
            crate::empty_vars_enum::GameCell::try_from_slice(&data_slice)
                .expect("borsh deser");

        assert_eq!(math_stuff, deser_math_stuff);
        super::byte_slice_to_file("./datums/empty_vars_enum.dat", &data_slice)
    }

    fn key_helper() -> (Pubkey, Pubkey){

        let arr_one: [u8; 32] = (0..32)
            .collect::<Vec<_>>()
            .try_into()
            .expect("wrong size iterator");
        let arr_two: [u8; 32] = (100..132)
            .collect::<Vec<_>>()
            .try_into()
            .expect("wrong size iterator");
        return (Pubkey::new_from_array(arr_one), Pubkey::new_from_array(arr_two))
    }
    pub fn struct_vars_enum1() {
        let mut data_slice = Vec::<u8>::new();

        let (pkey1, pkey2) = key_helper();
        let math_stuff = crate::struct_vars_enum::GameInstruction::GameReset {
            player_one: pkey1,
            player_two: pkey2,
        };
        #[allow(clippy::single_match)]
        match math_stuff {
            crate::struct_vars_enum::GameInstruction::GameReset {
                player_one,
                player_two,
            } => {
                println!("math_stuff {}", player_one);
                println!("math_stuff {}", player_two);
            }
            _ => {}
        }
        math_stuff
            .serialize(&mut data_slice)
            .expect("borsh serialize");

        let deser_math_stuff =
            crate::struct_vars_enum::GameInstruction::try_from_slice(&data_slice)
                .expect("borsh deser");

        assert_eq!(math_stuff, deser_math_stuff);
        super::byte_slice_to_file("./datums/struct_vars_enum1.dat", &data_slice)
    }

    pub fn struct_vars_enum2() {
        let mut data_slice = Vec::<u8>::new();

        let math_stuff =
            crate::struct_vars_enum::GameInstruction::MakeTurn { row: 12, col: 15 };
        math_stuff
            .serialize(&mut data_slice)
            .expect("borsh serialize");

        let deser_math_stuff =
            crate::struct_vars_enum::GameInstruction::try_from_slice(&data_slice)
                .expect("borsh deser");

        assert_eq!(math_stuff, deser_math_stuff);
        super::byte_slice_to_file("./datums/struct_vars_enum2.dat", &data_slice)
    }
    pub fn enum_array() {
        let mut data_slice = Vec::<u8>::new();


        let (pkey1, pkey2) = key_helper();

        let math_stuff =
            crate::enum_array::GameState {
            play_field: [crate::empty_vars_enum::GameCell::Tac; 9],
            status: crate::enum_array::GameStatus::PlayerOneTurn,
            player_one: pkey1,
            player_two: pkey2,

        };
        math_stuff
            .serialize(&mut data_slice)
            .expect("borsh serialize");

        let deser_math_stuff =
            crate::enum_array::GameState::try_from_slice(&data_slice)
                .expect("borsh deser");

        assert_eq!(math_stuff, deser_math_stuff);
        super::byte_slice_to_file("./datums/enum_array.dat", &data_slice)
    }
}

fn main() {
    experiment::empty_vars_enum();
    experiment::struct_vars_enum1();
    experiment::struct_vars_enum2();
    experiment::enum_array();
}
