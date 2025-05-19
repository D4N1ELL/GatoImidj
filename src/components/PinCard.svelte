<script>
    import { likedPins, toggleLike, isLiked } from '../stores/likedStore';
    
    export let image;
    // Handle hover state
    let isHovered = false;
    function toggleHover(state) {
        isHovered = state;
    }
    
    // Dynamic liked status
    $: liked = $likedPins.some(pin => pin.url === image.url);
    
    function handleLikeToggle(event) {
        event.stopPropagation(); // Prevent triggering other events
        toggleLike(image);
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
                <div class="actions">
                    <button 
                        class="like-button {liked ? 'liked' : ''}" 
                        on:click={handleLikeToggle}
                        title={liked ? "Remove from liked" : "Add to liked"}
                    >
                        {#if liked}
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        {:else}
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="none" stroke="currentColor" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        {/if}
                    </button>
                    <button class="save-button">Save</button>
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
        background-color: #ca001e;
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
        width: 100%;
    }
    
    .like-button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #333;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .like-button:hover {
        transform: scale(1.1);
    }
    
    .like-button.liked {
        color: #ca001e;
        background-color: #fff0f2;
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