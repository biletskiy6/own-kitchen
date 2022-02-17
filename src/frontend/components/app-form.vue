<template>
  <v-form ref="form" v-model="valid" @submit.prevent action="#" class="app-form">
    Valid: {{ valid }}
    <div v-for="formStep in formSteps" :key="formStep.id" class="divTableContainer">
      {{ formStep.name }}
      <div class="divTable">
        <div class="divTableBody">
          <div class="divTableRow divTableHeading">
            <div class="divTableCell vh">Title</div>
            <div class="divTableCell vh">Image</div>
            <div class="divTableCell">Breite(Size)</div>
            <div class="divTableCell">Anschlag</div>
            <div class="divTableCell">1/U1</div>
            <div class="divTableCell">Artikel <br/> Stückzahl</div>
            <div class="divTableCell">€ gesamt</div>
          </div>
          <div v-for="item in formStep.items" :key="item.id" class="divTableRow">
            <div class="divTableCell">Unterschrank</div>
            <div class="divTableCell">Image</div>
            <div class="divTableCell">
              <div class="d-fl fd-c">
                <p v-for="variation in item.variations" :key="variation.id">
                  {{ variation.name }}
                </p>
              </div>
            </div>
            <div class="divTableCell">
              <div class="d-fl fd-c">
                <p v-for="variation in item.variations" :key="variation.id">
                  {{ variation.direction }}
                </p>
              </div>
            </div>
            <div class="divTableCell">
              <div class="d-fl fd-c">
                <p v-for="variation in item.variations" :key="variation.id">
                  {{ variation.ratio }}
                </p>
              </div>
            </div>
            <div class="divTableCell">
              <div class="d-fl fd-c">
                <p v-for="variation in item.variations" :key="variation.id">
                  <v-text-field
                      :rules="[quantityRule]"
                      label="Quantity"
                      hide-details
                      single-line
                      type="number"
                      step="any"
                      min="0"
                      @input="(value) => setVariationQuantity({ itemId: item.id, variationId: variation.id, value })"
                  ></v-text-field>
                </p>
              </div>
            </div>
            <div class="divTableCell">
              <div class="d-fl fd-c">
                <p v-for="variation in item.variations" :key="variation.id">
                  {{ variation.total }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </v-form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "app-form",
  data() {
    return {
      valid: true,
      quantityRule: val => {
        if(val < 0) return 'Please enter a positive number'
        return true
      }
    }
  },
  computed: {
    ...mapGetters({
      formSteps: 'steps'
    })
  },
  methods: {
    ...mapActions({
      setVariationQuantity: 'setVariationQuantity'
    })
  }
}
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
  }
}

.divTableCell, .divTableHead {
  /*border: 1px solid #999999;*/
  display: table-cell;
  padding: 3px 10px;
}

.divTableFoot {
  background-color: #EEE;
  display: table-footer-group;
  font-weight: bold;
}

.divTableBody {
  display: table-row-group;
}
</style>
