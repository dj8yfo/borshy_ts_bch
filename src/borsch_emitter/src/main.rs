use std::fs::OpenOptions;
use std::io::Write;
use borsh::{BorshSerialize, BorshDeserialize};

mod empty_vars_enum;


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

fn main() {
    let mut data_slice = Vec::<u8>::new();

    let math_stuff = empty_vars_enum::GameCell::Tac;
    math_stuff
        .serialize(&mut data_slice)
        .expect("borsh serialize");

    let deser_math_stuff =
        empty_vars_enum::GameCell::try_from_slice(&data_slice).expect("borsh deser");

    assert_eq!(math_stuff, deser_math_stuff);
    byte_slice_to_file("./datums/empty_vars_enum.dat", &data_slice)
}
