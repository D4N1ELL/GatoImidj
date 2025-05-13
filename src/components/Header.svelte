<script>
  import { createEventDispatcher } from 'svelte';
  import SearchBar from './SearchBar.svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleSearch(event) {
    dispatch('search', event.detail);
  }
</script>

<header>
  <div class="logo">
    <h1>PinBoard</h1>
  </div>
  
  <SearchBar on:search={handleSearch} />
  
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/explore">Explore</a></li>
      <li><a href="/profile">Profile</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .logo h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #e60023;
  }
  
  nav ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
  
  nav a:hover {
    color: #e60023;
  }
</style>