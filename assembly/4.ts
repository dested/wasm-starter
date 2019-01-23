const dimensions = 100;

export function add(): void {
  for (let y: i32 = 0; y < dimensions; y++) {
    for (let x: i32 = 0; x < dimensions; x++) {
      setRed(x, y, getRed(x, y));
      setGreen(x, y, getGreen(x, y));
      setBlue(x, y, getBlue(x, y));
      setAlpha(x, y, 255);
    }
  }
}

function setRed(x: i32, y: i32, value: u8): void {
  store<u8>(y * dimensions * 4 + x * 4 + 0, value);
}
function setGreen(x: i32, y: i32, value: u8): void {
  store<u8>(y * dimensions * 4 + x * 4 + 1, value);
}
function setBlue(x: i32, y: i32, value: u8): void {
  store<u8>(y * dimensions * 4 + x * 4 + 2, value);
}
function setAlpha(x: i32, y: i32, value: u8): void {
  store<u8>(y * dimensions * 4 + x * 4 + 3, value);
}

function getRed(x: i32, y: i32): u8 {
  return (load<u8>(y * dimensions * 4 + x * 4 + 0) + 1) % 255;
}
function getGreen(x: i32, y: i32): u8 {
  return (load<u8>(y * dimensions * 4 + x * 4 + 1) + 2) % 255;
}
function getBlue(x: i32, y: i32): u8 {
  return (load<u8>(y * dimensions * 4 + x * 4 + 2) + 3) * 255;
}
