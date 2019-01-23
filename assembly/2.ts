export function add(): u8 {
  return load<u8>(0) + load<u8>(1);
}

