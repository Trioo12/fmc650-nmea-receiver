const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const portName = 'COM4'; // Sesuaikan port COM kamu di Device Manager
const baudRate = 9600;

const port = new SerialPort({
  path: portName,
  baudRate: baudRate,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on('open', () => {
  console.log(`[CONNECTED] Membuka port serial ${portName} pada baudrate ${baudRate}`);
});

parser.on('data', (line) => {
  // Menggunakan Regex untuk mencocokkan baris yang diawali $GP,$GN, $GL, atau$GA
  if (/^\$(GP|GN|GL|GA)/.test(line)) {
    console.log(`[NMEA DATA] ${line}`);
  }
});

port.on('error', (err) => {
  console.error('Error Port Serial: ', err.message);
});