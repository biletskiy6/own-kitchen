<template>
  <v-form
    ref="form"
    v-model="valid"
    action="#"
    class="app-form"
    @submit.prevent
  >
    <v-progress-linear :value="passingProgress"></v-progress-linear>
    <div
      class="form-step"
      v-for="(formStep, step) in formSteps"
      :key="formStep.id"
    >
      <div v-if="activeStep === step" class="form-step">
        <h4 class="form-step__header">{{ formStep.name }}</h4>
        <div class="step-items">
          <div
            v-for="item in formStep.items"
            :key="item.id"
            class="step-item furniture"
          >
            <div class="furniture__description">
              <h6 class="furniture__title">{{ item.name }}</h6>
              <div
                v-html="item.description"
                class="furniture__description"
              ></div>
            </div>
            <div class="furniture__image">
              <img
                src="https://thumbs.dreamstime.com/b/natural-scandinavian-living-room-interior-wooden-furniture-mockup-picture-empty-white-wall-154024411.jpg"
                alt=""
              />
            </div>
            <div class="furniture__variations">
              <div
                v-for="variation in item.variations"
                :key="variation.id"
                class="furniture__variation"
              >
                <div class="furniture__size">{{ variation.name }}</div>
                <div class="furniture__direction">
                  {{ variation.direction }}
                </div>
                <div class="furniture__ratio">{{ variation.ratio }}</div>
                <div class="furniture__quantity">
                  <v-text-field
                    :rules="[quantityRule]"
                    label="Quantity"
                    hide-details
                    single-line
                    type="number"
                    step="any"
                    min="0"
                    :value="
                      variationQuantity({
                        itemId: item.id,
                        variationId: variation.id,
                      })
                    "
                    @input="
                      (value) =>
                        handleInput({
                          itemId: item.id,
                          variationId: variation.id,
                          value,
                        })
                    "
                  ></v-text-field>
                </div>

                <div class="furniture__total">
                  {{
                    $eur(
                      variationPrice({
                        itemId: item.id,
                        variationId: variation.id,
                      })
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 form-footer">
      <div class="form-footer__navigation">
        <v-btn
          v-if="!isFirstStep"
          :disabled="isFirstStep"
          class="mr-4"
          :class="{ disabled: isFirstStep }"
          color="primary"
          @click="previousStep"
          >Previous Step</v-btn
        >
        <v-btn v-if="!isLastStep" color="primary" @click="nextStep"
          >Next Step</v-btn
        >
      </div>
      <div class="form-footer__total">
        <span>Summe € Seite {{ activeStep + 1 }}:</span>
        {{ $eur(totalStepPrice) }}
      </div>
    </div>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "app-form",
  data() {
    return {
      valid: true,
      quantityRule: (val) => {
        if (val < 0) return "Please enter a positive number";
        return true;
      },
    };
  },
  computed: {
    ...mapGetters({
      formSteps: "steps",
      variationQuantity: "variationQuantity",
      variationPrice: "variationPrice",
      activeStep: "activeStep",
      isFirstStep: "isFirstStep",
      isLastStep: "isLastStep",
      totalStepPrice: "totalStepPrice",
      passingProgress: "passingProgress",
    }),
  },
  methods: {
    ...mapActions({
      setVariationQuantity: "setVariationQuantity",
      updateVariationTotal: "updateVariationTotal",
      setStepTotal: "setStepTotal",
    }),
    ...mapMutations({
      nextStep: "NEXT_STEP",
      previousStep: "PREVIOUS_STEP",
    }),
    handleInput({ itemId, variationId, value }) {
      this.setVariationQuantity({ itemId, variationId, value });
      //this.updateVariationTotal({ itemId, variationId });
    },
  },
  watch: {
    totalStepPrice: {
      handler(newValue) {
        this.setStepTotal(newValue);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.d-fl {
  display: flex;
}

.fd-c {
  flex-direction: column;
}

.vh {
  visibility: hidden;
}

.divTable {
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-top: 80px;
}

.divTableRow {
  display: table-row;

  &:not(:first-child) {
    border-top: 1px solid #999;
    border-radius: 16px;
    padding-top: 24px;
  }
}

.divTableCell,
.divTableHead {
  /*border: 1px solid #999999;*/
  display: table-cell;
}

.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}

.divTableBody {
  display: table-row-group;
}
.divTableCellItem {
  display: flex;
  align-items: center;
  min-height: 50px;
}
.v-input.v-text-field {
  padding-top: 0;
  margin-top: 0;
}

.step-items {
  .step-item {
    display: flex;
    align-items: center;
    padding: 24px;
    //border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    border-radius: 8px;
  }
}
.form-step {
  &__header {
    font-weight: 900;
    text-align: center;
    margin: 18px 0 24px;
  }
}
.furniture {
  &__image {
    display: flex;
    align-items: center;
    min-width: 120px;
    justify-content: center;
    img {
      max-width: 60px;
      max-height: 60px;
      object-fit: cover;
    }
  }
  &__variations {
    //display: flex;
    width: 100%;
  }
  &__variation {
    display: flex;
    justify-content: space-between;
  }
  &__quantity {
    min-width: 220px;
    //min-width: 200px;
  }
  &__total {
    min-width: 100px;
    font-weight: 900;
    font-size: 20px;
  }
}

.form-footer {
  display: flex;
  justify-content: space-between;
  &__total {
    font-weight: 900;
    span {
      font-weight: 400;
    }
  }
}
</style>
