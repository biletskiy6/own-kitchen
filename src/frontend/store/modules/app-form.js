//import dinero from 'dinero.js'
//import { USD } from '@dinero.js/currencies'
import defaultKitchen from "../defaultKitchen";

const kitchenState =
  JSON.parse(localStorage.getItem("kitchen")) || defaultKitchen;

function calculateVariationPrice(items, itemId, variationId) {
  const item = items.find(({ id }) => id === itemId);
  const variation = item.variations.find(({ id }) => id === variationId);
  return item?.price * variation?.quantity * 100;
}
function findItemVariation(items, itemId, variationId) {
  const item = items.find(({ id }) => id === itemId);
  return item?.variations.find((variation) => variation.id === variationId);
}

export const appForm = {
  state: () => kitchenState,
  mutations: {
    SET_VARIATION_QUANTITY(state, { variation, value }) {
      variation.quantity = value;
    },
    UPDATE_VARIATION_TOTAL(state, { variation, total }) {
      variation.total = total;
    },
    NEXT_STEP(state) {
      state.activeStep++;
    },
    PREVIOUS_STEP(state) {
      state.activeStep--;
    },
    SET_STEP_TOTAL(state, { step, total }) {
      step.total = total;
    },
  },
  actions: {
    setVariationQuantity(
      {
        commit,
        getters: {
          currentStep: { items },
        },
      },
      { itemId, variationId, value }
    ) {
      commit("SET_VARIATION_QUANTITY", {
        variation: findItemVariation(items, itemId, variationId),
        value,
      });
    },
    updateVariationTotal(
      {
        commit,
        getters: {
          currentStep: { items },
        },
      },
      { itemId, variationId }
    ) {
      commit("UPDATE_VARIATION_TOTAL", {
        variation: findItemVariation(items, itemId, variationId),
        total: calculateVariationPrice(items, itemId, variationId),
      });
    },
    setStepTotal({ commit, getters: { currentStep } }, total) {
      commit("SET_STEP_TOTAL", { step: currentStep, total });
    },
  },
  getters: {
    steps: ({ steps }) => steps,
    currentStep: ({ steps, activeStep }) => steps[activeStep],
    activeStep: ({ activeStep }) => activeStep,
    variationQuantity:
      (state, getters) =>
      ({ itemId, variationId }) => {
        const variation = findItemVariation(
          getters.currentStep.items,
          itemId,
          variationId
        );
        return variation?.quantity || 0;
      },
    variationPrice:
      (state, { currentStep: { items } }) =>
      ({ itemId, variationId }) => {
        return calculateVariationPrice(items, itemId, variationId);
      },
    totalStepPrice(state, getters) {
      let total = 0;
      const stepItems = getters.currentStep.items;
      stepItems.forEach((item) => {
        total += item.variations.reduce((acc, curr) => {
          return (acc += calculateVariationPrice(stepItems, item.id, curr.id));
        }, 0);
      });
      return total;
    },
    isFirstStep(state, getters) {
      return getters.activeStep === 0;
    },
    totalSteps(state, getters) {
      return getters.steps.length;
    },
    isLastStep(state, getters) {
      return getters.activeStep === getters.totalSteps - 1;
    },
    passingProgress(state, { activeStep, totalSteps }) {
      return Math.floor((activeStep / totalSteps) * 100);
    },
  },
};
