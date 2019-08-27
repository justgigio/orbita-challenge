import req from "supertest";
import app from "../src/index";

import { User } from "../models/index";

let token;

beforeAll((done) => {
  let user1 = User.create({
    name: 'User to Delete',
    email: 'deleteme@orbita.cc',
    password: 'delete',
    state: 'AK'
  });
  let user2 = User.create({
    name: 'First User',
    email: 'first@orbita.cc',
    password: '123abc',
    state: 'CA'
  });

  Promise.all([user1, user2]).then(() => {
    req(app).post("/auth")
    .send({email: 'first@orbita.cc', password: '123abc'}).end((_err, response) => {
      token = response.body.token;
      done();
    });
  });
});

describe("[GET] /users", () => {
  it('returns the logged user', async () => {
    const res = await req(app).get("/users")
      .set('x-access-token', token);

    expect(res.body.user.email).toBe("first@orbita.cc");
    expect(res.body.user.password).toBe(undefined);
  });
});

describe("[POST] /users", () => {

  it('updates user', async () => {
    const res = await req(app).post("/users")
      .set('x-access-token', token)
      .send({name: 'First User Edited'});

    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe('First User Edited');

    let firstUser = await User.findOne({where: {email: 'first@orbita.cc'}});
    expect(firstUser.name).toBe('First User Edited');
  });
});

describe("[DELETE] /users", () => {
  it('removes user', async () => {
    const authRes = await req(app).post("/auth")
    .send({email: 'deleteme@orbita.cc', password: 'delete'});
    let token = authRes.body.token;

    const res = await req(app).delete("/users")
      .set('x-access-token', token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    let deleteUser = await User.findOne({where: {email: 'deleteme@orbita.cc'}});
    expect(deleteUser).toBe(null);
  });
})
