<script>
    import { likedPins, toggleLike, isLiked } from '../stores/likedStore';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    export let image;
    
    // Handle hover state
    let isHovered = false;
    function toggleHover(state) {
        isHovered = state;
    }
    
    // Handle image zoom/fullscreen
    let isZoomed = false;
    
    function toggleZoom(event) {
        // Only zoom if we're not clicking on buttons
        if (event.target.tagName !== 'BUTTON' && 
            event.target.tagName !== 'SVG' && 
            event.target.tagName !== 'PATH') {
            isZoomed = !isZoomed;
            
            // Dispatch event to notify parent components
            dispatch('zoom', { 
                zoomed: isZoomed, 
                image: image 
            });
        }
    }
    
    // Close zoom with escape key
    function handleKeydown(event) {
        if (event.key === 'Escape' && isZoomed) {
            isZoomed = false;
            dispatch('zoom', { zoomed: false, image: image });
        }
    }
    
    // Dynamic liked status
    $: liked = $likedPins.some(pin => pin.url === image.url);
    
    function handleLikeToggle(event) {
        event.stopPropagation(); // Prevent triggering zoom
        toggleLike(image);
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="pin-card"
    on:mouseenter={() => toggleHover(true)}
    on:mouseleave={() => toggleHover(false)}
    on:click={toggleZoom}
    class:zoomed={isZoomed}
    role="button"
    tabindex="0"
    aria-label={`View ${image.title}`}
    on:keydown={(e) => e.key === 'Enter' && toggleZoom(e)}
>
    <div class="image-container">
        <img src={image.url} alt={image.title} />
        {#if isHovered && !isZoomed}
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

{#if isZoomed}
    <div class="zoom-overlay" on:click={toggleZoom} role="dialog" aria-modal="true" aria-label={`${image.title} - Full view`}>
        <div class="zoom-content" on:click|stopPropagation>
            <button class="close-button" on:click={toggleZoom}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
            <img src={image.url} alt={image.title} />
            <div class="zoom-info">
                <h2>{image.title}</h2>
                {#if image.user}
                    <div class="zoom-user">
                        <div class="avatar large">
                            {image.user.charAt(0).toUpperCase()}
                        </div>
                        <span>{image.user}</span>
                    </div>
                {/if}
                <div class="zoom-actions">
                    <button 
                        class="like-button large {liked ? 'liked' : ''}" 
                        on:click={handleLikeToggle}
                    >
                        {#if liked}
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>Liked</span>
                        {:else}
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="none" stroke="currentColor" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>Like</span>
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .pin-card {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        background-color: var(--color-card-bg);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
        cursor: pointer;
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
    
    /* Zoom View Styles */
    .zoom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        overflow-y: auto;
    }
    
    .zoom-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        overflow: hidden;
        background-color: var(--color-card-bg);
    }
    
    .zoom-content img {
        height: auto;
        max-height: 60vh;
        width: auto;
        max-width: 100%;
        object-fit: contain;
        border-radius: 0;
    }
    
    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 10;
        color: #333;
    }
    
    .zoom-info {
        padding: 1.5rem;
        background-color: var(--color-card-bg);
        position: relative;
        flex-shrink: 0;
    }
    
    .zoom-info h2 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }
    
    .zoom-user {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }
    
    .avatar.large {
        width: 36px;
        height: 36px;
        font-size: 1rem;
    }
    
    .zoom-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem; 
        position: relative; 
        z-index: 5; 
    }
    
    .like-button.large {
        display: flex;
        width: auto;
        height: auto;
        padding: 0.75rem 1.25rem;
        border-radius: 24px;
        gap: 0.5rem;
        background-color: var(--color-button-bg, #f0f0f0); /* Add contrast */
        color: var(--color-button-text, #333); /* Ensure visible text */
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
    }
</style>