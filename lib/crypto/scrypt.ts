import { Buffer } from 'buffer';
import { scrypt } from 'scrypt-js';
import toBuffer from 'typedarray-to-buffer';

const createScryptHash = async function ({ data, salt, cpuFactor, memoryFactor, parallism, keyLength }: {
  data: Buffer;
  salt: Buffer;
  cpuFactor: number;
  memoryFactor: number;
  parallism: number;
  keyLength: number;
}): Promise<Buffer> {
  const sanitizedKeyLength = keyLength > 8 ? keyLength : 8;
  const key = await scrypt(data, salt, cpuFactor, memoryFactor, parallism, sanitizedKeyLength, (): void => {
    // NO OP
  });

  return toBuffer(key);
};

export { createScryptHash };
