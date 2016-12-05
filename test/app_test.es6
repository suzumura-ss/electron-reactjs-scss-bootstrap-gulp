import Chai from'chai';
Chai.use(require('chai-as-promised'));
const expect = Chai.expect;

import path from 'path';
const ext = (process.platform === 'win32')? '.cmd' : '';
const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron' + ext);
const appPath = path.join(__dirname, '..');

import {Application} from 'spectron';
const app = new Application({
  path: electronPath,
  args: [appPath, 'HELLO']
});


describe('Application', ()=>{
  before(()=>{
    return app.start().then(()=>{
      return app.client.waitUntilWindowLoaded();
    });
  });

  it('browserWindow is visible', ()=>{
    return expect(app.browserWindow.isVisible()).eventually.to.equal(true);
  });

  // see http://webdriver.io/api.html
  it('application title is `Example`', ()=>{
    return expect(app.client.getTitle()).eventually.to.equal('Example');
  });

  it('button text is `HELLO`', ()=>{
    return expect(app.client.getText('button')).eventually.to.equal('HELLO');
  });

  it('label text is initially `0`', ()=>{
    return expect(app.client.getText('span.label')).eventually.to.equal('0');
  });

  it('When the button is clicked, the label text becomes `1`', ()=>{
    return app.client.click('button').then(()=>{
      return expect(app.client.getText('span.label')).eventually.to.equal('1');
    });
  });

  after(()=>{
    return app.stop();
  });
});
