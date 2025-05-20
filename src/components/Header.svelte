<script>
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import SearchBar from './SearchBar.svelte';
  import { likedPins } from '../stores/likedStore';
  import DarkButton from './DarkModeSwitch.svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleSearch(event) {
    dispatch('search', event.detail);
  }
  
  // Check if current page is active
  $: isHomePage = $page?.url?.pathname === '/' || $page?.url?.pathname === '';
  $: isLikedPage = $page?.url?.pathname === '/liked';
  
  // Get count of liked pins for the badge
  $: likedCount = $likedPins.length;
</script>

<slot />

<header>
  <div class="logo">
    <h1>GatoImidj</h1>
  </div>
  <SearchBar on:search={handleSearch} />
  <nav>
    <ul>
      <li class:active={isHomePage}>
        <a href="/">Home</a>
      </li>
      <li class:active={isLikedPage}>
        <a href="/liked" class="liked-link">
          Liked
          {#if likedCount > 0}
            <span class="liked-count">{likedCount}</span>
          {/if}
        </a>
      </li>
      <li>
        <DarkButton/>
      </li>
    </ul>
  </nav>
</header>



<style>
  header {
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--color-background-header);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--color-logo);
  }

  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1rem;
    align-items: center;
  }

  nav a {
    text-decoration: none;
    color: var(--color-text);
    font-weight: 500;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  li.active a {
    color: var(--color-text-active);
    font-weight: 600;
  }

  nav a:hover {
    text-decoration: underline;
  }

  .liked-link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    position: relative;
  }

  .liked-count {
    background-color: #ca001e;
    color: white;
    border-radius: 50%;
    min-width: 1.25rem;
    height: 1.25rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.25rem;
  }

</style>