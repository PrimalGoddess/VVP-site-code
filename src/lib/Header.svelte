<script>
    import 
    {
        visibleComponent
    } 
    from "./store";
    import { onMount } from 'svelte';
    let menuOpen = false;
    const toggleMenu = () => { menuOpen = !menuOpen; };

    const buttonPageWelcome = () => {
        // Open the forum area
        $visibleComponent = "welcome";
    };
    const buttonPageGuild = () => {
        // Open the guild area
        $visibleComponent = "guild";
    };
    const buttonPageDen = () => {
        // Open the den - Remember to make this personal to the player
        $visibleComponent = "den";
    };
    const buttonPageLab = () => {
        // Open the lab - Remember to make this personal to the player
        $visibleComponent = "lab";
    };
    const buttonPageMarket = () => {
        // Open the market area
        $visibleComponent = "market";
    };
    const buttonPageGames = () => {
        // Open the mini-game area
        $visibleComponent = "games";
    };
    const buttonPageForum = () => {
        // Open the forum area
        $visibleComponent = "forum";
    };
    const buttonPageLibrary = () => {
        // Open the library
        $visibleComponent = "library";
    };
    const buttonPageLogin = () => {
        // Login
        $visibleComponent = "login";
    };
</script>

<style>
    
button {
  position: relative;
  font-size: 1.1em;
  color: #56ff67;
  text-decoration: none;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 3px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  background: transparent;
  border: 2.5px solid #6dcaff;
  border-style: groove;
  border-radius: 3px;
  box-shadow: 0 0 10px #00ffc8;
  backdrop-filter: blur(20px);
}

/* minimal scoped styles; larger rules go in app css */
.menu-toggle {
    display: none;
    background: transparent;
    border: none;
    font-size: 1.6rem;
    padding: 0.4rem;
    cursor: pointer;
}

.site-nav { display: flex; gap: 1rem; align-items: center; }

/* show hamburger on small screens and collapse nav into vertical panel */
@media (max-width: 768px) {
    .menu-toggle { display: inline-flex; align-items:center; }
    .site-nav {
        position: absolute;
        top: 60px; /* adjust according to header height */
        right: 0;
        background: var(--panel-bg, #fff);
        flex-direction: column;
        gap: 0;
        width: min(260px, 80%);
        transform: translateY(-8px);
        padding: 0.6rem;
        border-radius: 8px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        opacity: 0;
        pointer-events: none;
        transition: opacity 180ms ease, transform 180ms ease;
    }
    .site-nav.open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }
    .site-nav a, .site-nav button { width: 100%; text-align: left; padding: 0.6rem 0.8rem; }
}
</style>

<header class="bg-success p-2">
    <h2 class="logo">Vakaroria</h2>
    <nav class="navigation">
        <button on:click={()=> {buttonPageWelcome()}}>
            Welcome
        </button>
        <button on:click={()=> {buttonPageGuild()}}>
            Guild
        </button>
        <button on:click={()=> {buttonPageDen()}}>
            Den
        </button>
        <button on:click={()=> {buttonPageLab()}}>
            Labratory
        </button>
        <button on:click={()=> {buttonPageMarket()}}>
            Market
        </button>
        <button on:click={()=> {buttonPageGames()}}>
            Mini-Games
        </button>
        <button on:click={()=> {buttonPageForum()}}>
            Forums
        </button>
        <button on:click={()=> {buttonPageLibrary()}}>
            Library
        </button>
        <button on:click={()=> {buttonPageLogin()}}>
            Login
        </button>
    </nav>
    <button
        class="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        on:click={toggleMenu}
    >
        <!-- simple hamburger icon -->
        <span class="hamburger" aria-hidden="true">☰</span>
    </button>
</header>