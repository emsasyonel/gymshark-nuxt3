<template>
  <div class="auth-layout">
    <div class="auth-header">
      <NuxtLink to="/">
      </NuxtLink>
    </div>

    <div class="auth-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}
.logo { width: 150px; margin-bottom: 40px; }
.auth-content { width: 100%; max-width: 480px; padding: 0 20px; }
</style>