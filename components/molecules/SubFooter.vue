<template>
  <div class="sub-footer">
    <div class="sub-footer-container">
      <span class="copyright">© 2025 Gymshark Limited | All Rights Reserved. | We Do Gym.</span>
      
      <div class="legal-links">
        <NuxtLink to="#">Terms & Conditions</NuxtLink>
        <NuxtLink to="#">Terms of Use</NuxtLink>
        <NuxtLink to="#">Privacy Notice</NuxtLink>
        <NuxtLink to="#">Cookie Policy</NuxtLink>
        <NuxtLink to="#">Modern Slavery</NuxtLink>
      </div>

      <div class="region-selector">
        <span>🇺🇸</span>
        <span>US</span>
        <span>English</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sub-footer {
  background-color: #ffffff;
  padding: 1.5rem 0;
}
.sub-footer-container {
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #555;
  flex-wrap: wrap;
  gap: 1rem;
}
.legal-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.legal-links a { text-decoration: none; color: #555; }
.legal-links a:hover { text-decoration: underline; }
.region-selector {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
}
</style>