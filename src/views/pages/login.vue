<script setup>
import useLogin from '@/application/composables/use-login'
import { IconLogo } from '@/components/icons'
import { requiredRule } from '@/application/vuetify-validation'

const usernameRules = [requiredRule]
const passwordRules = [requiredRule]

const { onLogin, loginErrorText, username, password, loginForm, isLoading } = useLogin()
</script>

<template>
  <div class="login-page">
    <v-container>
      <v-row justify="center" align="center">
        <v-col xs="12" sm="8" md="6">
          <IconLogo class="logo" />
          <v-form @submit.prevent="onLogin" ref="loginForm">
            <v-text-field
              v-model="username"
              label="Логин"
              class="mb-4"
              type="text"
              variant="outlined"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Пароль"
              type="password"
              variant="outlined"
              class="mb-4"
              :rules="passwordRules"
              required
            ></v-text-field>
            <div class="d-flex align-center">
              <v-btn
                variant="plain"
                type="submit"
                size="x-large"
                class="bg-blue-grey-darken-3 mr-4"
                :disabled="isLoading"
                >Войти</v-btn
              >
              <span class="text-red-accent-2">{{ loginErrorText }}</span>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.logo {
  width: 192px;
  color: #355084;
  margin-bottom: 48px;
}

.login-page {
  height: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 115px;
}
</style>
