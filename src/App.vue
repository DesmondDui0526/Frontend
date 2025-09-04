<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div class="flex items-center pl-8">
        <img
          src="./assets/img/popules_logo.png"
          class="w-[15rem]"
          alt="Popules.com | Communities thrive where people connect"
        />
      </div>

      <!-- Search -->
      <div class="flex-1 mx-6 max-w-xl">
        <div class="relative group">
          <input
            type="text"
            placeholder="Search the feeds you like"
            class="text-gray-700 w-full border rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <font-awesome-icon
            :icon="['fas', 'search']"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 duration-200"
          />
        </div>
      </div>

      <!-- Right top buttons -->
      <div class="flex items-center space-x-4">
        <button class="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700">
          Post
        </button>
        <button class="p-2 rounded-full hover:bg-gray-200">
          <font-awesome-icon :icon="['fas', 'bell']" class="text-gray-600 !w-6 !h-6" />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-200">
          <font-awesome-icon :icon="['fas', 'user-circle']" class="text-gray-600 !w-6 !h-6" />
        </button>
      </div>
    </header>

    <!-- Sidebar toggle button -->
    <button
      @click="toggleSidebar"
      class="fixed left-0 z-50 flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-md rounded-r-full shadow hover:bg-white transition-colors duration-200 focus:outline-none top-1/2 -translate-y-1/2"
    >
      <font-awesome-icon
        :icon="['fas', sidebarOpen ? 'angle-left' : 'angle-right']"
        class="text-gray-700 w-5 h-5"
      />
    </button>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside
        :class="
          sidebarOpen
            ? 'w-60 p-6 flex flex-col fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300'
            : 'w-0 p-0 overflow-hidden fixed top-0 left-0 h-screen transition-all duration-300'
        "
      >
        <!-- Sidebar item lists-->
        <nav class="flex flex-col space-y-4">
          <a
            href="#"
            class="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'home']" class="w-6 h-6" />
            <span class="text-lg font-medium">Explore</span>
          </a>

          <a
            href="#"
            class="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'user-friends']" class="w-6 h-6" />
            <span class="text-lg font-medium">Following</span>
          </a>

          <a
            href="#"
            class="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" class="w-6 h-6" />
            <span class="text-lg font-medium">Messages</span>
          </a>

          <!-- Dropdown items -->
          <div
            class="overflow-hidden transition-all duration-300"
            :class="moreOpen ? 'max-h-40 mt-2' : 'max-h-0'"
          >
            <a
              href="#"
              class="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
            >
              <font-awesome-icon :icon="['fas', 'user']" class="w-6 h-6" />
              <span class="text-lg font-medium">Profile</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
            >
              <font-awesome-icon :icon="['fas', 'briefcase']" class="w-6 h-6" />
              <span class="text-lg font-medium">Business</span>
            </a>
          </div>
        </nav>

        <button
          @click="toggleMore"
          class="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100 focus:outline-none"
        >
          <font-awesome-icon :icon="['fas', 'ellipsis-h']" class="w-6 h-6" />
          <span class="text-lg font-medium">More</span>
          <font-awesome-icon
            :icon="['fas', moreOpen ? 'angle-up' : 'angle-down']"
            class="ml-auto w-4 h-4"
          />
        </button>

        <div class="mt-auto space-y-4">
          <div class="pb-4">
            <p class="text-lg text-gray-700 mb-2">Join our community now!</p>
            <button class="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800">
              Login
            </button>
          </div>

          <!-- More dropdown -->
          <div>
            <button
              @click="toggleMoreBottom"
              class="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
            >
              <font-awesome-icon :icon="['fas', 'bars']" class="w-6 h-6" />
              <span class="text-lg font-medium">More</span>
              <font-awesome-icon
                :icon="['fas', moreBottomOpen ? 'angle-up' : 'angle-down']"
                class="ml-auto w-4 h-4"
              />
            </button>

            <div
              class="overflow-hidden transition-all duration-300"
              :class="moreBottomOpen ? 'max-h-40 mt-2' : 'max-h-0'"
            >
              <!-- About Us -->
              <button
                @click="aboutModal = true"
                class="flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
              >
                <span class="text-md">About Us</span>
              </button>

              <!-- Privacy Policy -->
              <button
                @click="policyModal = true"
                class="flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-gray-100"
              >
                <span class="text-md">Privacy Policy</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <main
        :class="
          sidebarOpen
            ? 'flex-1 ml-60 flex flex-col transition-all duration-300'
            : 'flex-1 flex flex-col transition-all duration-300'
        "
      >
        <!-- Category -->
        <nav class="flex px-6 py-3 bg-white border-b mt-6 overflow-x-auto">
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            All
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Vacancies
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Workplace
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Food
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Design
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Cars
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Finance
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Lifestyle
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Travel
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Makeup
          </button>
          <button class="text-gray-700 font-medium hover:text-pink-600 whitespace-nowrap px-4">
            Fitness
          </button>
        </nav>

        <div class="flex-1 mt-4 px-6 overflow-y-auto">
          <FeedView />
        </div>
      </main>
    </div>

    <!-- About Us Modal -->
    <div v-if="aboutModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
        <h1 class="text-2xl text-black mb-4">About Us</h1>
        <p class="text-gray-600">
          At Popules.com, we believe that communities thrive when people connect, share, and grow
          together. Our platform is designed to bring individuals, groups, and organizations
          closer—through meaningful conversations, shared passions, and collective experiences.
          Founded with the vision of creating a safe, engaging, and people-first digital space,
          Popules.com empowers users to express themselves authentically while discovering new
          opportunities to connect with others.Our values: Authenticity — Real voices, real people,
          real connections. Safety — Tools and policies that ensure a secure and respectful
          environment. Empowerment — Features that give users control over their content and
          privacy. Growth — Opportunities for personal, social, and professional development. At
          Popules.com, you’re not just a user — you’re part of a growing community that values your
          voice. Join us and be part of the conversation. Together, let’s make social media truly
          social again.
        </p>
        <div class="mt-6 flex justify-end">
          <button
            @click="aboutModal = false"
            class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Privacy Policy Modal -->
    <div v-if="policyModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[80vh] p-6 overflow-y-auto">
        <h2 class="text-2xl font-semibold mb-4 text-black">Privacy Policy for Popules.com</h2>
        <p class="text-gray-600 mb-4"><strong>Last Updated:</strong> July 18, 2025</p>
        <p class="text-gray-600 mb-4">
          Welcome to popules.com! We are committed to protecting your privacy and providing you with
          a safe and enjoyable social experience. This Privacy Policy explains how Popules.com
          ("we," "us," or "our") collects, uses, discloses, and protects information about you when
          you use our website, mobile applications, and other online products and services
          (collectively, the "Services").
        </p>
        <p class="text-gray-600 mb-4">
          By accessing or using our Services, you agree to the terms of this Privacy Policy. If you
          do not agree with the terms, please do not access or use our Services.
        </p>

        <h3 class="font-semibold text-lg mt-4 mb-2">1. Information We Collect</h3>
        <p class="text-gray-600 mb-2">
          We collect information about you in various ways when you use our Services.
        </p>

        <h4 class="font-semibold text-md mt-2 mb-1">a. Information You Provide Directly</h4>
        <ul class="list-disc list-inside text-gray-600 mb-2">
          <li>
            Account Information: Name, email, password, date of birth, gender, profile picture.
          </li>
          <li>Profile Information: Bio, interests, location, links to social profiles.</li>
          <li>Content You Create: Posts, photos, videos, comments, messages.</li>
          <li>Communications: Messages and support inquiries.</li>
          <li>Survey and Contest Info: Provided info during surveys or contests.</li>
          <li>
            Payment Info: Payment details for purchases (processed securely via third-party
            providers).
          </li>
        </ul>

        <h4 class="font-semibold text-md mt-2 mb-1">b. Information Collected Automatically</h4>
        <ul class="list-disc list-inside text-gray-600 mb-2">
          <li>
            Usage Information: Features you use, content viewed, searches, interactions, timing.
          </li>
          <li>Log Data: Browser info, IP address, timestamps.</li>
          <li>Device Information: Hardware model, OS, unique device identifiers.</li>
          <li>Location Info: With consent, precise or general location.</li>
          <li>Cookies & Similar Technologies: For analytics and improving user experience.</li>
        </ul>

        <h4 class="font-semibold text-md mt-2 mb-1">c. Information From Third Parties</h4>
        <ul class="list-disc list-inside text-gray-600 mb-2">
          <li>Social Media Integrations: Info from linked accounts (e.g., Facebook, Google).</li>
          <li>Partners & Service Providers: Info from business partners or advertisers.</li>
        </ul>

        <h3 class="font-semibold text-lg mt-4 mb-2">2. How We Use Your Information</h3>
        <ul class="list-disc list-inside text-gray-600 mb-2">
          <li>Provide and maintain our Services.</li>
          <li>Personalize your experience.</li>
          <li>Communicate with you regarding services and updates.</li>
          <li>Enable social interactions.</li>
          <li>Develop new features and services.</li>
          <li>Analyze and improve usage patterns.</li>
          <li>Deliver targeted marketing.</li>
          <li>Ensure security and legal compliance.</li>
        </ul>

        <h3 class="font-semibold text-lg mt-4 mb-2">3. How We Share Your Information</h3>
        <p class="text-gray-600 mb-2">
          We may share your information with other users, business partners, service providers, and
          as required by law.
        </p>

        <!-- Close Button -->
        <div class="mt-6 flex justify-end">
          <button
            @click="policyModal = false"
            class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end">
      <button
        @click="policyModal = false"
        class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import FeedView from './views/FeedView.vue'
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSearch,
  faTh,
  faBell,
  faUserCircle,
  faHome,
  faUserFriends,
  faEnvelope,
  faEllipsisH,
  faUser,
  faBriefcase,
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faBars,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSearch,
  faTh,
  faBell,
  faUserCircle,
  faHome,
  faUserFriends,
  faEnvelope,
  faEllipsisH,
  faUser,
  faBriefcase,
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faBars,
)

const moreOpen = ref(false)
const moreBottomOpen = ref(false)
const sidebarOpen = ref(true)
const aboutModal = ref(false)
const policyModal = ref(false)

function toggleMore() {
  moreOpen.value = !moreOpen.value
}
function toggleMoreBottom() {
  moreBottomOpen.value = !moreBottomOpen.value
}
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
