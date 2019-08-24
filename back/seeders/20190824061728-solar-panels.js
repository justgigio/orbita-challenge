'use strict';

const fs = require('fs');

const rawdata = fs.readFileSync(__dirname + '/solar_data.json');
const solar_data = JSON.parse(rawdata);

module.exports = {
  up: (queryInterface) => {

    /*
      {"Data Provider":"California Public Utilities Commission (Currently Interconnected Dataset)","Installation Date":"12/16/15","System Size":"6.36","Zip Code":"92009","State":"CA","Cost":"665.3864375"}
    */

    return queryInterface.bulkInsert('solar_panels', solar_data.map((json_solar_panel) => {
      let timestamp = new Date();
      let solar_panel = {
        createdAt: timestamp,
        updatedAt: timestamp
      };
      Object.keys(json_solar_panel).forEach((key) => {
        solar_panel[key.replace(/ /g, '').replace(/^./, l => l.toLowerCase())] = json_solar_panel[key];
      });
      return solar_panel;
    }) , {});
  },

  down: (queryInterface) => {
   return queryInterface.bulkDelete('solar_panels', null, {});
  }
};
