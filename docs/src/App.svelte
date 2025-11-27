<script>
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Welcome from "./lib/Welcome.svelte";
  import Games from "./lib/Games.svelte";
  import Forum from "./lib/Forum.svelte"; 
  import HigherLower from "./lib/HigherLower.svelte";
  import Login from "./lib/Login.svelte";
  
  import { visibleComponent } from "./lib/store";
  // welcome,games,forum,higherLower,lab,library
</script>

<div class="container">
  <Header />
  <main class="p-2 border">
    {#if $visibleComponent === "welcome"}
      <Welcome />
    {/if}
    {#if $visibleComponent === "games"}
      <Games />
    {/if}
    {#if $visibleComponent === "forum"}
      <Forum />
    {/if}
    {#if $visibleComponent === "higherLower"}
      <HigherLower />
    {/if}
    {#if $visibleComponent === "login"}
      <Login />
    {/if}
  </main>
  <Footer />{#if $visibleComponent === "higherLower"}
      <HigherLower />
    {/if}
</div>