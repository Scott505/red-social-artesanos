import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, saltRounds);
};

export const compare = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
