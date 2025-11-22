<script>
    import { isAuthenticated, logout } from '../stores/authStore.js';
</script>

<nav>
    <a href="/">Home</a>
    <a href="/public">Public Info</a>

    {#if $isAuthenticated}
        <a href="/dashboard" class="nav-button">Dashboard</a>
        <a href="/profile" class="nav-button">Profile Settings</a>
        <button on:click={logout} class="nav-button">Logout</button>
    
    {:else}
        <a href="/login" class="nav-button">Login</a>
        <a href="/register" class="nav-button">Register</a>
    {/if}
</nav>

<style>
   .navigation a {
    position: flex;
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
</style>