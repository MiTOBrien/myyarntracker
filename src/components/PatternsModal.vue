<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL
const name = ref('')
const description = ref('')
const difficulty = ref(false)
const yarn_weight = ref('')
const yarn_amount = ref(false)
const gauge = ref(false)
const needles = ref('')
const pattern_file_url = ref('')
const pattern_file_name = ref('')
const pattern_file_type = ref('')
const pattern_file_size = ref(false)

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
    <div class="pattern-form">
      <button class="close-btn" @click="$emit('close')">×</button>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label class="modal-text" for="name">Pattern Name:</label>
          <input
            v-model="name"
            type="text"
            id="name"
            name="name"
            placeholder="Enter pattern name"
            required
          />
        </div>

        <div class="form-group">
          <label class="modal-text" for="description">Description:</label>
          <textarea
            v-model="description"
            id="description"
            name="description"
            placeholder="Enter pattern description"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="modal-text" for="difficulty">Difficulty:</label>
          <select v-model="difficulty" id="difficulty" name="difficulty" required>
            <option value="">Select difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="easy">Easy</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
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

        <div class="form-group">
          <label class="modal-text" for="gauge">Gauge:</label>
          <div class="modal-text">
            <input
              v-model="gauge"
              id="gauge"
              name="gauge"
              placeholder="Enter gauge (e.g., 4 stitches per inch)"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="modal-text" for="needles">Needles:</label>
          <div class="modal-text">
            <input
              v-model="needles"
              id="needles"
              name="needles"
              placeholder="(e.g., 4.5mm circular needles)"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="modal-text" for="pattern_file">Pattern File:</label>
          <input
            type="file"
            id="pattern_file"
            name="pattern_file"
            placeholder="Upload pattern file"
            required
          />
        </div>

        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
