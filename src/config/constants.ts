export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
};

export const database = {
  name: `${process.env.DATABASE_NAME}`,
  user: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASS}`,
};
