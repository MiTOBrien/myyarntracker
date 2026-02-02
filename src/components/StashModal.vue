<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL
const name = ref('')
const brand = ref('')
const yarn_name = ref('')
const colorway = ref('')
const fiber_content = ref('')
const yarn_weight = ref('')
const yarn_amount = ref(false)

const emit = defineEmits(['close', 'open-login'])

const openLogin = () => {
  emit('close')
  emit('open-login')
}

const router = useRouter()
const userStore = useUserStore()

const submit = async () => {
  if (!isPasswordValid.value) {
    alert('Password does not meet complexity requirements')
    return
  }

  if (!doPasswordsMatch.value) {
    alert('Passwords do not match')
    return
  }

  if (!acceptedTOS.value) {
    alert('You must acknowledge the Terms of Service to register.')
    return
  }

  try {
    console.log('Registering user:', email.value) // Debug log
    console.log('API Base URL:', API_BASE_URL) // Debug log
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email: email.value,
          password: password.value,
          confirm_password: confirmPassword.value,
          tos_accepted: acceptedTOS.value,
        },
      }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Registration successful! Please login.')
      userStore.showRegisterModal = false
    } else {
      alert(data.error || 'Registration failed')
    }
  } catch (error) {
    console.error(error)
    alert('An error occurred during registration')
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="stash-form">
      <button class="close-btn" @click="$emit('close')">×</button>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label class="modal-text" for="name">Yarn Name:</label>
          <input
            v-model="name"
            type="text"
            id="name"
            name="name"
            placeholder="Enter yarn name"
            required
          />
        </div>

        <div class="form-group">
          <label class="modal-text" for="brand">Brand:</label>
          <input
            v-model="brand"
            type="text"
            id="brand"
            name="brand"
            placeholder="Enter yarn brand"
            required
          />
        </div>

        <div class="form-group">
          <label class="modal-text" for="colorway">Colorway:</label>
          <input
            v-model="colorway"
            type="text"
            id="colorway"
            name="colorway"
            placeholder="Enter yarn colorway"
            required
          />
        </div>

        <div class="form-group">
          <label class="modal-text" for="fiber_content">Fiber Content:</label>
          <input
            v-model="fiber_content"
            type="text"
            id="fiber_content"
            name="fiber_content"
            placeholder="Enter fiber content (e.g., 100% Wool)"
            required
          />
        </div>

        <div class="form-group">
          <label class="modal-text" for="yarn_weight">Yarn Weight:</label>
          <div class="modal-text">
            <input
              v-model="yarn_weight"
              id="yarn_weight"
              name="yarn_weight"
              placeholder="Enter yarn weight"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="modal-text" for="yarn_amount">Yarn Amount:</label>
          <div class="modal-text">
            <input
              v-model="yarn_amount"
              id="yarn_amount"
              name="yarn_amount"
              placeholder="Enter yarn amount"
              required
            />
          </div>
        </div>

        <button type="submit" class="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>