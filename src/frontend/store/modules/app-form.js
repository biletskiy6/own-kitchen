import {v4} from "uuid";

export const appForm = {
  state: () => ({
    activeStep: 1,
    steps: [
      {
        id: v4(),
        name: 'Step 1',
        items: [
          {
            id: v4(),
            name: 'Base Cabinet',
            image: '',
            variations: [
              {id: v4(), name: 'J U45', direction: 'L', ratio: 146, quantity: 0, total: 0},
              {id: v4(), name: 'J U45', direction: 'R', ratio: 146, quantity: 1, total: 0},
              {id: v4(), name: 'J U60', direction: 'L', ratio: 158, quantity: 2, total: 0},
              {id: v4(), name: 'J U60', direction: 'R', ratio: 158, quantity: 3, total: 0},
            ]
          }
        ]
      }
    ],
  }),
  mutations: {
    SET_VARIATION_QUANTITY(state, { variation, value }) {
      variation.quantity = value
    }
  },
  actions: {
    setVariationQuantity({ commit, getters: { currentStep } }, { itemId, variationId, value }) {
      const item = currentStep?.items.find(({ id }) => id === itemId)
      const variation = item?.variations.find((variation) => variation.id === variationId)
      commit('SET_VARIATION_QUANTITY', { variation, value })
    }
  },
  getters: {
    steps: ({ steps }) => steps,
    currentStep: ({ steps, activeStep }) => steps[activeStep - 1],
    activeStep: ({ activeStep }) => activeStep,
  }
}
