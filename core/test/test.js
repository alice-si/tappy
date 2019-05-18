const BN = require('bn.js');
const chai = require('chai');
const truffleAssert = require('truffle-assertions');

// TODO this file could be converted and used to test our contracts for card id management

const expect =
  chai
  .use(require('chai-as-promised'))
  .use(require('chai-bn')(BN))
  .expect;

const Building = artifacts.require('Building');
const Token = artifacts.require('Token');

contract('Building', ([owner, tenant]) => {
  const RENT = 10;
  const INSTANT_CASH = 2;
  const SAVINGS_BONUS = 3;

  let token;
  let building;

  beforeEach(async () => {
    token = await Token.new({from: owner});
    await token.mint(owner, 9001);

    building = await Building.new(
      token.address, INSTANT_CASH, SAVINGS_BONUS, {from: owner});
    await token.approve(building.address, 100);
    await building.payIn(100);
  });

  it('should allow access to creationTime', async () => {
    let minuteAgo = new Date();
    minuteAgo.setMinutes(minuteAgo.getMinutes() - 1);

    let minuteAfter = new Date();
    minuteAfter.setMinutes(minuteAfter.getMinutes() + 1);

    let creationTime = new Date(await building.creationTime() * 1000);
    expect(creationTime).to.be.above(minuteAgo);
    expect(creationTime).to.be.below(minuteAfter);
  });

  it('should return zero savings for newly added tenants', async () => {
    await building.onboardTenant(tenant, {from: owner});
    expect(await building.getSavings(tenant))
      .to.be.a.bignumber.that.equals('0');
  });

  it('should only allow owner to onboard tenants', async () => {
    await expect(building.onboardTenant(tenant, {from: tenant}))
      .to.be.rejected;
  });

  it('should transfer cash to tenant after claim is submitted',
    async () =>
  {
    let balanceBefore = await token.balanceOf(tenant);

    await building.onboardTenant(tenant, {from: owner});
    await building.claimOutcome(0, /* INSTANT_CASH */ 0, {from: tenant});

    let balanceAfter = await token.balanceOf(tenant);
    expect(balanceAfter - balanceBefore).to.equal(INSTANT_CASH);
  });

  it('should emit an event when instant cash is transferred', async () => {
    await building.onboardTenant(tenant, {from: owner});
    let tx = await building.claimOutcome(0, /* INSTANT_CASH */ 0, {from: tenant});

    truffleAssert.eventEmitted(tx, 'OutcomeAchieved', ev => {
      return ev.tenant == tenant
        && ev.period.eq(new BN(0))
        && ev.instantCash.eq(new BN(INSTANT_CASH))
        && ev.savingsBonus.eq(new BN(0));
    });
  });

  it('should increase savings after claim is submitted',
    async () =>
  {
    await building.onboardTenant(tenant, {from: owner});
    await building.claimOutcome(0, /* SAVINGS_BONUS */ 1, {from: tenant});

    expect(await building.getSavings(tenant))
      .to.be.a.bignumber.that.equals(new BN(SAVINGS_BONUS));
  });

  it('should emit an event when savings are increased', async () => {
    await building.onboardTenant(tenant, {from: owner});
    let tx = await building.claimOutcome(0, /* SAVINGS_BONUS */ 1, {from: tenant});

    truffleAssert.eventEmitted(tx, 'OutcomeAchieved', ev => {
      return ev.tenant == tenant
        && ev.period.eq(new BN(0))
        && ev.instantCash.eq(new BN(0))
        && ev.savingsBonus.eq(new BN(SAVINGS_BONUS));
    });
  });

  it('should not allow claiming twice during a single period', async () => {
    await building.onboardTenant(tenant, {from: owner});
    await building.claimOutcome(0, /* INSTANT_CASH */ 0, {from: tenant});
    await expect(building.claimOutcome(0, /* INSTANT_CASH */ 0, {from: tenant}))
      .to.be.rejected;
  });

  it('should transfer all savings to tenant after cash out', async () => {
    let balanceBefore = await token.balanceOf(tenant);

    await building.onboardTenant(tenant, {from: owner});
    await building.claimOutcome(0, /* SAVINGS_BONUS */ 1, {from: tenant});
    await building.cashOut({from: tenant});

    let balanceAfter = await token.balanceOf(tenant);
    expect(balanceAfter - balanceBefore).to.equal(SAVINGS_BONUS);
  });
});
