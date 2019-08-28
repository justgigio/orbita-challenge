import req from "supertest";
import app from "../src/index";

import { User } from "../models/index";

beforeAll(() => {
  let user1 = User.create({
    name: 'Some User',
    email: 'some@orbita.cc',
    password: '123456',
    state: 'NY'
  });

  return Promise.all([user1]);
});

describe("[POST] /auth", () => {
  it('fails when password wrong', async () => {
    const res = await req(app).post("/auth")
      .send({email: 'xxx', password: 'yyy'});

    expect(res.body.auth).toBe(false);
  });

  it('login user', async () => {
    const res = await req(app).post("/auth")
      .send({email: 'some@orbita.cc', password: '123456'});

    expect(res.body.auth).toBe(true);
    expect(res.body.token.length).toBeGreaterThan(10);
  });
});

afterAll(() => {
  return User.destroy({ where: { email: 'some@orbita.cc' } });
});
