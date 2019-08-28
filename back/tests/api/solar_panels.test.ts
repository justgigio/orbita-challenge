import req from "supertest";
import app from "../../src/index";

import { User, SolarPanel } from "../../models/index";
import { Model } from "sequelize/types";

async function auth(email:String, password: String) {

  const tokenRes = await req(app).post("/auth")
    .send({email, password});

  return tokenRes.body.token;
}

describe('[GET] /api/solar_panels', () => {

  it('not authenticated user not allowed', async () => {
    const res = await req(app).get("/api/solar_panels");
    expect(res.status).toBe(401);
  });

  it('return an unfiltered list', async () => {

    let token = await auth('admin@orbita.cc', 'admin');

    const res = await req(app).get("/api/solar_panels").set('x-access-token', token);

    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(20);
  });

  it('return a list filtered only by state', async () => {

    let token = await auth('causer@orbita.cc', '123abc');

    const res = await req(app).get("/api/solar_panels").set('x-access-token', token);

    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(7);
  });

  it('return nothing for no state user', async () => {

    let token = await auth('nostateuser@orbita.cc', '789ghi');

    const res = await req(app).get("/api/solar_panels").set('x-access-token', token);

    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(0);
  });

  it('filter by zipcode', async () => {

    let token = await auth('causer@orbita.cc', '123abc');

    const res = await req(app).get("/api/solar_panels")
      .set('x-access-token', token)
      .send({zipCode: '92024'});


    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(2);
    expect(res.body.solarPanels[0].zipCode).toBe('92024');
  });

  it('filter by zipcode from another state', async () => {

    let token = await auth('nyuser@orbita.cc', '456def');

    const res = await req(app).get("/api/solar_panels")
      .set('x-access-token', token)
      .send({zipCode: '92024'});


    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(0);
  });

  it('filter by dataProvider', async () => {

    let token = await auth('nyuser@orbita.cc', '456def');

    const res = await req(app).get("/api/solar_panels")
      .set('x-access-token', token)
      .send({dataProvider: 'Solar Initiative'});


    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(1);
    expect(res.body.solarPanels[0].dataProvider).toMatch('Solar Initiative');
  });

  it('filter by cost', async () => {

    let token = await auth('nyuser@orbita.cc', '456def');

    const res = await req(app).get("/api/solar_panels")
      .set('x-access-token', token)
      .send({minCost: 400, maxCost: 800});


    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(5);

    let minCost = 801;
    let maxCost = 399;

    res.body.solarPanels.forEach(solarPanel => {
      if (solarPanel.cost < minCost) {
        minCost = solarPanel.cost;
      }

      if (solarPanel.cost > maxCost) {
        maxCost = solarPanel.cost;
      }
    });

    expect(minCost).toBeGreaterThan(399);
    expect(maxCost).toBeLessThan(801);
  });

  it('filter by installation date', async () => {
    let token = await auth('causer@orbita.cc', '123abc');

    let minInstallationDate = new Date(2016, 1, 1).toISOString();
    let maxInstallationDate = new Date(2016, 2, 28).toISOString();

    const res = await req(app).get("/api/solar_panels")
      .set('x-access-token', token)
      .send({minInstallationDate, maxInstallationDate});


    expect(res.status).toBe(200);
    expect(res.body.solarPanels.length).toBe(2);
  });

});

beforeAll((done) => {

  let dataObjects:Promise<Model>[] = [];

  dataObjects.push(User.create({
    name: 'Admin',
    email: 'admin@orbita.cc',
    password: 'admin',
    role: 'admin',
    state: '*'
  }));

  dataObjects.push(User.create({
    name: 'Normal CA User',
    email: 'causer@orbita.cc',
    password: '123abc',
    state: 'CA'
  }));

  dataObjects.push(User.create({
    name: 'Normal NY User',
    email: 'nyuser@orbita.cc',
    password: '456def',
    state: 'NY'
  }));

  dataObjects.push(User.create({
    name: 'Normal No State User',
    email: 'nostateuser@orbita.cc',
    password: '789ghi',
    state: 'DE'
  }));

  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-22T00:00:00.000Z",
    systemSize: 4.725,
    zipCode: "91913",
    state: "CA",
    cost: 494.3319052
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset) & California Public Utilities Commission (California Solar Initiative)",
    installationDate: "2009-12-14T00:00:00.000Z",
    systemSize: 1.505,
    zipCode: "92113",
    state: "NY",
    cost: 609.2389144
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-16T00:00:00.000Z",
    systemSize: 6.36,
    zipCode: "92009",
    state: "AK",
    cost: 665.3864375
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-17T00:00:00.000Z",
    systemSize: 2.385,
    zipCode: "92024",
    state: "CA",
    cost: 249.5199141
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-29T00:00:00.000Z",
    systemSize: 5.775,
    zipCode: "92069",
    state: "NY",
    cost: 604.1834397
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-16T00:00:00.000Z",
    systemSize: 7.42,
    zipCode: "92021",
    state: "AK",
    cost: 776.2841771
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-01-06T00:00:00.000Z",
    systemSize: 7.59,
    zipCode: "92119",
    state: "CA",
    cost: 721.5347301
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-02-09T00:00:00.000Z",
    systemSize: 8.28,
    zipCode: "92129",
    state: "NY",
    cost: 787.1287965
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-18T00:00:00.000Z",
    systemSize: 2.475,
    zipCode: "92040",
    state: "AK",
    cost: 258.9357599
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-03-24T00:00:00.000Z",
    systemSize: 4.905,
    zipCode: "92024",
    state: "CA",
    cost: 466.2882544
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-16T00:00:00.000Z",
    systemSize: 8.215,
    zipCode: "92057",
    state: "NY",
    cost: 859.4574817
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset) & California Public Utilities Commission (California Solar Initiative)",
    installationDate: "2010-01-05T00:00:00.000Z",
    systemSize: 3.87,
    zipCode: "92064",
    state: "AK",
    cost: 1086.289511
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-16T00:00:00.000Z",
    systemSize: 4.77,
    zipCode: "92027",
    state: "CA",
    cost: 499.0398281
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-01-20T00:00:00.000Z",
    systemSize: 5.98,
    zipCode: "92677",
    state: "NY",
    cost: 568.4819086
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-16T00:00:00.000Z",
    systemSize: 5.565,
    zipCode: "92069",
    state: "AK",
    cost: 582.2131328
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-29T00:00:00.000Z",
    systemSize: 2.12,
    zipCode: "92069",
    state: "CA",
    cost: 221.7954792
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-06-27T00:00:00.000Z",
    systemSize: 4.2,
    zipCode: "92111",
    state: "NY",
    cost: 399.2682301
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-01-11T00:00:00.000Z",
    systemSize: 3.57,
    zipCode: "92675",
    state: "AK",
    cost: 339.3779956
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2016-02-04T00:00:00.000Z",
    systemSize: 6.89,
    zipCode: "92677",
    state: "CA",
    cost: 654.9900251
  }));
  dataObjects.push(SolarPanel.create({
    dataProvider: "California Public Utilities Commission (Currently Interconnected Dataset)",
    installationDate: "2015-12-17T00:00:00.000Z",
    systemSize: 6.555,
    zipCode: "92009",
    state: "NY",
    cost: 685.7874367
  }));

  Promise.all(dataObjects).then(() => {
    done();
  });
});
