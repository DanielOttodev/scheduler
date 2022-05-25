<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Services</v-card-title>
          <v-card-subtitle>Manage Business Services</v-card-subtitle>
          <v-card-actions
            ><v-btn color="primary" :to="'/services'" text small
              >Add Service</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Staff</v-card-title>
          <v-card-subtitle>Manage Staff Members</v-card-subtitle>
          <v-card-actions
            ><v-btn color="primary" text small :to="'/addStaff'"
              >Add Staff</v-btn
            ></v-card-actions
          >
          <v-container>
            <StaffTable />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>