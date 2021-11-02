<template>
  <v-container>
    <v-row>
      <v-flex xs12 sm6 offset-sm-3>
        <v-list subheader two-line flat>
          <h1 class="text--secondary mb-3">Orders</h1>
          <v-list-item-group>
            <v-list-item v-for="order in orders" :key="order.id">
              <v-list-item-action>
                <!-- :input-value="order.done  отмечен чек-бокс или нет  -->
                <v-checkbox
                  color="success"
                  @change="markDone(order)"
                  :input-value="order.done"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ order.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: "fdfd",
          name: "Asel",
          phone: "8-923-730-0671",
          adId: "23",
          done: false,
        },
        {
          id: "fdfefdd",
          name: "Busel",
          phone: "8-923-730-0671",
          adId: "24",
          done: false,
        },
      ],
    };
  },
  methods: {
    markDone(order) {
      order.done = true;
    },
  },
};
</script>