use std::fs::OpenOptions;
use std::io::Write;

mod empty_vars_enum;
mod struct_vars_enum;

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
    use std::convert::TryInto;
    use borsh::{BorshDeserialize, BorshSerialize};
    use solana_program::pubkey::Pubkey;

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

    pub fn struct_vars_enum1() {
        let mut data_slice = Vec::<u8>::new();
        let arr_one: [u8; 32] = (0..32).collect::<Vec<_>>()
            .try_into().expect("wrong size iterator");
        let arr_two: [u8; 32] = (0..32).rev().collect::<Vec<_>>()
            .try_into().expect("wrong size iterator");

        let math_stuff = crate::struct_vars_enum::GameInstruction::GameReset {
            player_one: Pubkey::new_from_array(arr_one),
            player_two: Pubkey::new_from_array(arr_two),
        };
        #[allow(clippy::single_match)]
        match math_stuff {
            crate::struct_vars_enum::GameInstruction::GameReset {player_one, player_two} => {
                println!("math_stuff {}", player_one);
                println!("math_stuff {}", player_two);
            },
            _ => {},
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

        let math_stuff = crate::struct_vars_enum::GameInstruction::MakeTurn {
            row: 12,
            col: 15,
        };
        math_stuff
            .serialize(&mut data_slice)
            .expect("borsh serialize");

        let deser_math_stuff =
            crate::struct_vars_enum::GameInstruction::try_from_slice(&data_slice)
                .expect("borsh deser");

        assert_eq!(math_stuff, deser_math_stuff);
        super::byte_slice_to_file("./datums/struct_vars_enum2.dat", &data_slice)
    }
}

fn main() {
    experiment::empty_vars_enum();
    experiment::struct_vars_enum1();
    experiment::struct_vars_enum2();
}
