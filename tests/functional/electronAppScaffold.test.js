import chai from 'chai';
import dirty from 'dirty-chai';
import fs from 'fs';

import { createTestInstance, StubLog } from '../helpers/meteorDesktop';

chai.use(dirty);
const { describe, it } = global;
const { expect } = chai;

describe('electronAppScaffold', () => {
    let MeteorDesktop;

    beforeEach(() => {
        MeteorDesktop = createTestInstance();
    });

    describe('#make', () => {
        it('should create .meteor-desktop scaffold', (done) => {
            const logStub = new StubLog(MeteorDesktop.electronApp.scaffold, 'info');
            MeteorDesktop.electronApp.scaffold.make().then(() => {
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.root)).to.be.true();
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.cordova)).to.be.true();
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.index)).to.be.true();
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.app)).to.be.true();
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.preload)).to.be.true();
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.modules)).to.be.true();
                expect(fs.existsSync(MeteorDesktop.env.paths.electronApp.packageJson)).to.be.true();

                logStub.restore();
                done();
            }).catch((e) => { done(e); logStub.restore(); });
        });
    });
});
