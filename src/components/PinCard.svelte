<script>
  export let image;
  
  // Handle hover state
  let isHovered = false;
  
  function toggleHover(state) {
    isHovered = state;
  }
</script>

<div class="pin-card" 
  on:mouseenter={() => toggleHover(true)}
  on:mouseleave={() => toggleHover(false)}
>
  <div class="image-container">
    <img src={image.url} alt={image.title} />
    
    {#if isHovered}
      <div class="overlay">
        <button class="save-button">Save</button>
        <div class="actions">
          <button class="icon-button">🔗</button>
          <button class="icon-button">⋯</button>
        </div>
      </div>
    {/if}
  </div>
  
  <div class="content">
    <h3 class="title">{image.title}</h3>
    {#if image.user}
      <div class="user">
        <div class="avatar">
          {image.user.charAt(0).toUpperCase()}
        </div>
        <span>{image.user}</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .pin-card {
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
  }
  
  .pin-card:hover {
    transform: translateY(-2px);
  }
  
  .image-container {
    position: relative;
    width: 100%;
  }
  
  img {
    width: 100%;
    display: block;
    border-radius: 16px;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 16px;
  }
  
  .save-button {
    align-self: flex-end;
    background-color: #e60023;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
  }
  
  .icon-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .content {
    padding: 0.75rem;
  }
  
  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
  }
</style>