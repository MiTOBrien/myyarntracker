<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL
const name = ref('')
const brand = ref('')
const yarn_name = ref('')
const colorway = ref('')
const dye_lot = ref('')
const fiber = ref('')
const yarn_weight = ref('')
const yardage = ref(false)
const num_skeins = ref(false)

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
          <label class="modal-text" for="dye_lot">Dye Lot:</label>
          <input
            v-model="dye_lot"
            type="text"
            id="dye_lot"
            name="dye_lot"
            placeholder="Enter dye lot"
          />
        </div>

        <div class="form-group">
          <label class="modal-text" for="fiber">Fiber:</label>
          <select v-model="fiber" id="fiber" name="fiber" class="modal-text">
            <option value="">Select fiber</option>
            <option value="alpaca">Alpaca</option>
            <option value="cashmere">Cashmere</option>
            <option value="mohair">Mohair</option>
            <option value="silk">Silk</option>
            <option value="wool">Wool</option>
            <option value="bamboo">Bamboo</option>
            <option value="cotton">Cotton</option>
            <option value="linen">Linen</option>
            <option value="rayon">Rayon</option>
            <option value="acrylic">Acrylic</option>
            <option value="nylon">Nylon</option>
            <option value="polyester">Polyester</option>
            <option value="stellina">Stellina</option>
          </select>
        </div>

        <div class="form-group">
          <label class="modal-text" for="yarn_weight">Yarn Weight:</label>
          <select v-model="yarn_weight" id="yarn_weight" name="yarn_weight" class="modal-text">
            <option value="">Select yarn weight</option>
            <option value="lace">Lace</option>
            <option value="superfine">Superfine</option>
            <option value="fine">Fine</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="bulky">Bulky</option>
            <option value="superbulky">Super Bulky</option>
            <option value="jumbo">Jumbo</option>
          </select>
        </div>

        <div class="form-group">
          <label class="modal-text" for="yardage">Yardage per skein:</label>
            <input
              v-model="yardage"
              type="text"
              id="yardage"
              name="yardage"
              placeholder="Enter yardage"
              required
            />
        </div>

        <div class="form-group">
          <label class="modal-text" for="num_skeins">Number of Skeins:</label>
            <input
              v-model="num_skeins"
              id="num_skeins"
              name="num_skeins"
              placeholder="Enter number of skeins"
              required
            />
        </div>

        <button type="submit" class="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>