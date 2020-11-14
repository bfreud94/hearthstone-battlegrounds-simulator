// Imports for external dependencies
const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

const tierFourMinions = [
    'Annoy-o-Module',
    'Bolvar, Fireblood',
    'Cave Hydra',
    'Cobalt Scalebane',
    'Defender of Argus',
    'Drakonid Enforcer',
    'Floating Watcher',
    'Goldgrubber',
    'Herald of Flame',
    'Majordomo Executus',
    'Mechano-Egg',
    'Menagerie Jug',
    'Primalfin Lookout',
    'Ripsnarl Captain',
    'Security Rover',
    'Savannah Highmane',
    'Siegebreaker',
    'Toxfin',
    'Virmen Sensei',
    'Wildfire Elemental'
];

const tierFourCopies = 11;

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../mockedResponses/minionPoolAtTier/minionPoolAtTier4.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
        .get('/api/minionPoolAtTier?tier=4')
        .reply(200, json);
});

// Integration test for Minion Pool API
// Tier 4 Testing
describe('Minions at Tier 4', () => {
    it('Total Minions', (done) => {
        request.get('/api/minionPoolAtTier?tier=4').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            const { minions } = response.body;
            tierFourMinions.forEach((minion) => {
                const totalMinionCopies = minions.filter((minionCopy) => minion === minionCopy.minionName).length;
                expect(totalMinionCopies).to.equal(tierFourCopies);
            });
            done();
        });
    });
});