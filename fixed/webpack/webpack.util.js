const path = require('path');
const fs = require('fs');

const util = {

  composePath: (...paths) => path.join(process.cwd(), ...paths),

  parsePath: p => path.posix.join('', p),

  readFile: (p, isJSON) => isJSON ? JSON.parse(fs.readFileSync(p), { encoding: 'UTF-8' }) : fs.readFileSync(p, { encoding: 'UTF-8' }),

  baseCfgPath: path.join(process.cwd(), 'kfront-base.json'),

  baseCfg: function () {
    return this.readFile(this.baseCfgPath, true);
  },

  rewriteBaseConfig: function (mode) {
    let content = this.baseCfg();
    content.webpack.mode = mode;
    let newContent = JSON.stringify(content, null, 2);
    fs.writeFileSync(this.baseCfgPath, newContent);
  },

  addWebpackAlias: function (...alia) {
    let content = this.baseCfg();
    let apps = content.webpack.projectName;
    let alias = {};

    apps.map(app => {
      alias[app] = this.composePath(`${app}`);
    });

    alia.map(item => {
      if (!alias[item]) {
        alias[item] = this.composePath(`${item}`);
      }
    });

    return alias;
  },

  getEntrys: function () {
    let entrys = {};
    let baseCfg = this.baseCfg();
    let apps = baseCfg.webpack.projectName;

    apps.map(app => {
      entrys[app] = `${app}/index.js`;
    });

    return entrys;
  }
};

module.exports = util;