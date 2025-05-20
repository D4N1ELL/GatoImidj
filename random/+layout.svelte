<script>
  import { onMount } from 'svelte';
  import '../styles/global.css';

  // State for dark mode
  let darkMode = false;

  // Toggle dark mode function
  function toggleDarkMode() {
    darkMode = !darkMode;
    
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  // Initialize the theme based on localStorage or system preference
  onMount(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      darkMode = true;
      document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
      darkMode = false;
      document.body.classList.remove('dark-mode');
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode = prefersDark;
      
      if (prefersDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    }
  });
</script>

<slot />

<button class="theme-toggle" on:click={toggleDarkMode} aria-label="Toggle dark mode">
  {#if darkMode}
    <!-- Sun icon for light mode -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  {:else}
    <!-- Moon icon for dark mode -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text);
    background-color: var(--color-card-bg);
    box-shadow: 0 2px 5px var(--color-shadow);
    transition: all 0.3s ease;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    background-color: var(--color-primary);
    color: var(--color-background);
  }

  svg {
    transition: transform 0.5s ease;
  }

  .theme-toggle:hover svg {
    transform: rotate(30deg);
  }
</style>