import Blockchain from './Blockchain';

// Rinkeby.
const FIRST_BLOCK = 4200000;

function listenForTenantUpdates(callback) {
  let contract = Blockchain.contract();

  let filterOnboarding = contract.filters.TenantEnrolled();
  let filterOutcomes = contract.filters.OutcomeAchieved();
  let filterGraduation = contract.filters.TenantGraduated();

  let collectedData = {};

  contract.on(filterOnboarding, (tenant, period) => {
    console.log('onboarding!');
    if (!collectedData[tenant]) collectedData[tenant] = {};

    Object.assign(collectedData[tenant], {
      address: tenant,
      onboarding: Number(period),
    });
    callback(collectedData[tenant]);
  });

  contract.on(filterOutcomes, (tenant, period, instantCash) => {
    // console.log(JSON.stringify(
    //   {
    //     type: 'outcome',
    //     tenant,
    //     period,
    //     instantCash
    //   }
    // ));
    if (!collectedData[tenant]) collectedData[tenant] = {};
    if (!collectedData[tenant].outcomes) {
      collectedData[tenant].outcomes = [];
    }
    collectedData[tenant].outcomes.push({
      period: Number(period),
      choice: (instantCash > 0 ? 'cash' : 'savings')
    });

    // Don't emit events before we get onboarding information.
    if (collectedData[tenant].onboarding !== undefined) {
      callback(collectedData[tenant]);
    }
  });

  contract.on(filterGraduation, (tenant, period) => {
    console.log('graduation');
    if (!collectedData[tenant]) collectedData[tenant] = {};

    Object.assign(collectedData[tenant], {
      graduation: Number(period),
    });

    if (collectedData[tenant].onboarding !== undefined) {
      callback(collectedData[tenant]);
    }
  });

  Blockchain.resetEventsBlock(FIRST_BLOCK);
}

export function aggregateStats(callback) {
  let allTenantsWithJobs = new Set();
  let curTenantsWithJobs = new Set();
  let graduatedTenants = new Set();

  let programDuration = new Map();
  let joblessDuration = new Map();

  let savingsPeriods = new Set();
  let cashingsPeriods = new Set();

  function update(tenant) {
    let savingsRate = null;
    if (savingsPeriods.size + cashingsPeriods.size > 0) {
      let total = savingsPeriods.size + cashingsPeriods.size;
      savingsRate = Math.round(100 * (savingsPeriods.size / total));
    }

    callback({
      jobsCreated: allTenantsWithJobs.size,
      currentlyEmployed: curTenantsWithJobs.size,
      avgTimeToIndependence: mapValuesAverage(programDuration),
      nowIndependent: graduatedTenants.size,
      avgTimeToFindJob: mapValuesAverage(joblessDuration),
      savingsRate,
      tenant,
    });
  }

  listenForTenantUpdates(tenant => {
    if (tenant.outcomes && tenant.outcomes.length > 0) {
      allTenantsWithJobs.add(tenant.address);
      curTenantsWithJobs.add(tenant.address);

      let firstJobPeriod = Math.min(...tenant.outcomes.map(o => o.period));
      joblessDuration.set(
        tenant.address, firstJobPeriod - tenant.onboarding + 1);

      for (let outcome of tenant.outcomes) {
        let id = `${tenant.address}@${outcome.period}`;
        if (outcome.choice == 'cash') {
          cashingsPeriods.add(id);
        } else {
          savingsPeriods.add(id);
        }
      }
    }

    if (tenant.graduation) {
      graduatedTenants.add(tenant.address);
      curTenantsWithJobs.delete(tenant.address);
      programDuration.set(
        tenant.address, tenant.graduation - tenant.onboarding + 1);
    }

    update(tenant);
  });
}

export async function listenForHistoryEvents (cb) {
  let contract = Blockchain.contract();
  let account = await Blockchain.account();
  console.log('Account: ' + account)
  let filterOutcomesForUser = contract.filters.OutcomeAchieved(account);

  contract.on(filterOutcomesForUser, (tenant, period, instantCash) => {
    console.log('History outcome');
    cb({
      period: Number(period),
      choice: (instantCash > 0 ? 'cash' : 'savings')
    });
  });
}

function mapValuesAverage(m) {
  if (m.size > 0) {
    let sum = 0;
    for (let v of m.values()) sum += v;
    return sum / m.size;
  } else {
    return null;
  }
}
