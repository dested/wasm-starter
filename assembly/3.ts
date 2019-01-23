const dimensions = 100;

export function add(): void {
  for (let y: i32 = 0; y < dimensions; y++) {
    for (let x: i32 = 0; x < dimensions; x++) {
      setRed(x, y, 50);
      setGreen(x, y, 127);
      setBlue(x, y, 50);
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
